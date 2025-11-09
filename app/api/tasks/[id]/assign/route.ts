import { NextRequest, NextResponse } from 'next/server'
import { prisma, calculateTaskCost } from 'db'
import { requireUser } from '@/lib/supabase/server'
import { reserveCredits, InsufficientCreditsError } from 'lib'
import { createBranch, createOrUpdateFile, createPullRequest } from 'lib'

type Params = {
  params: Promise<{
    id: string
  }>
}

/**
 * POST /api/tasks/[id]/assign
 * Assign a task to a human executor (reserves credits)
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser()
    const { id: taskId } = await params
    const body = await request.json()

    const { assigneeId } = body

    if (!assigneeId) {
      return NextResponse.json(
        { error: 'assigneeId is required' },
        { status: 400 }
      )
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get task with project
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: true,
      },
    })

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // Check ownership
    if (task.project.ownerId !== dbUser.id && dbUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if task is already assigned
    if (task.status !== 'open') {
      return NextResponse.json(
        { error: 'Task is not open for assignment' },
        { status: 400 }
      )
    }

    // Verify assignee exists and is an executor
    const assignee = await prisma.user.findUnique({
      where: { id: assigneeId },
    })

    if (!assignee) {
      return NextResponse.json({ error: 'Assignee not found' }, { status: 404 })
    }

    if (assignee.role !== 'executor' && assignee.role !== 'admin') {
      return NextResponse.json(
        { error: 'Assignee must be an executor' },
        { status: 400 }
      )
    }

    // Calculate cost
    const cost = calculateTaskCost(task.type, task.complexity)

    // Reserve credits
    try {
      await reserveCredits(
        dbUser.id,
        cost,
        `task_assign:${task.type}`,
        taskId
      )
    } catch (error) {
      if (error instanceof InsufficientCreditsError) {
        return NextResponse.json(
          { error: 'Insufficient credits. Please top up your wallet.' },
          { status: 402 }
        )
      }
      throw error
    }

    // Create GitHub branch and PR
    const branchName = `task/${taskId}-${task.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

    try {
      await createBranch(task.project.repoFullName, branchName, 'main')

      // Create task scaffold file
      const taskDoc = `# Task: ${task.title}

## Description
${task.description || 'No description provided'}

## Type
${task.type}

## Complexity
${task.complexity}

## Acceptance Criteria
- [ ] Implementation complete
- [ ] Tests added
- [ ] Documentation updated
- [ ] Code reviewed

## Estimated Cost
${cost} credits

---
Task ID: ${taskId}
Assigned to: ${assignee.name || assignee.email}
Created: ${new Date().toISOString()}
`

      await createOrUpdateFile(
        task.project.repoFullName,
        branchName,
        `docs/task-${taskId}.md`,
        taskDoc,
        `Initialize task: ${task.title}`
      )

      // Create PR
      const prUrl = await createPullRequest(
        task.project.repoFullName,
        `Task #${taskId}: ${task.title}`,
        branchName,
        'main',
        `## Task Details

**Type:** ${task.type}
**Complexity:** ${task.complexity}
**Cost:** ${cost} credits

${task.description || ''}

---
Assigned to: @${assignee.name || assignee.email}`
      )

      // Update task
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          status: 'assigned',
          assigneeId,
          githubBranch: branchName,
          githubPrUrl: prUrl,
          reservedCredits: cost,
        },
        include: {
          assignee: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      })

      // Create notification
      await prisma.notification.create({
        data: {
          userId: dbUser.id,
          kind: 'task_assigned',
          payload: {
            taskId: updatedTask.id,
            taskTitle: updatedTask.title,
            assigneeName: assignee.name || assignee.email,
            cost,
            prUrl,
          },
        },
      })

      return NextResponse.json({
        task: updatedTask,
        cost,
        prUrl,
      })
    } catch (error: any) {
      // If GitHub operations fail, refund credits
      const { refundCredits } = await import('lib')
      await refundCredits(dbUser.id, cost, 'task_assign_failed', taskId)

      throw error
    }
  } catch (error: any) {
    console.error('Error assigning task:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to assign task' },
      { status: 500 }
    )
  }
}
