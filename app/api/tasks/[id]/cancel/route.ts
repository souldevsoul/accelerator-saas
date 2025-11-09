import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'db'
import { requireUser } from '@/lib/supabase/server'
import { refundCredits } from 'lib'
import { closePullRequest } from 'lib'

type Params = {
  params: Promise<{
    id: string
  }>
}

/**
 * POST /api/tasks/[id]/cancel
 * Cancel a task and refund credits
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser()
    const { id: taskId } = await params

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

    // Check if task can be canceled
    if (task.status === 'done' || task.status === 'canceled') {
      return NextResponse.json(
        { error: 'Task is already completed or canceled' },
        { status: 400 }
      )
    }

    // Close PR if exists
    if (task.githubPrUrl) {
      try {
        const prNumber = parseInt(task.githubPrUrl.split('/').pop()!)
        await closePullRequest(task.project.repoFullName, prNumber)
      } catch (error) {
        console.error('Error closing PR:', error)
        // Continue even if PR close fails
      }
    }

    // Refund credits if reserved
    if (task.reservedCredits > 0) {
      await refundCredits(
        task.project.ownerId,
        task.reservedCredits,
        'task_canceled',
        taskId
      )
    }

    // Update task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        status: 'canceled',
        reservedCredits: 0,
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
        kind: 'task_canceled',
        payload: {
          taskId: updatedTask.id,
          taskTitle: updatedTask.title,
          refundedCredits: task.reservedCredits,
        },
      },
    })

    return NextResponse.json({
      task: updatedTask,
      refundedCredits: task.reservedCredits,
    })
  } catch (error: any) {
    console.error('Error canceling task:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to cancel task' },
      { status: 500 }
    )
  }
}
