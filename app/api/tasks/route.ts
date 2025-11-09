import { NextRequest, NextResponse } from 'next/server'
import { prisma, calculateTaskCost } from 'db'
import { requireUser } from '@/lib/supabase/server'

/**
 * POST /api/tasks
 * Create a new task
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireUser()
    const body = await request.json()

    const { projectId, title, description, type, complexity } = body

    if (!projectId || !title || !type || !complexity) {
      return NextResponse.json(
        { error: 'projectId, title, type, and complexity are required' },
        { status: 400 }
      )
    }

    // Validate type and complexity
    const validTypes = ['feature', 'bug', 'content', 'other']
    const validComplexities = ['S', 'M', 'L']

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    if (!validComplexities.includes(complexity)) {
      return NextResponse.json(
        { error: `Invalid complexity. Must be one of: ${validComplexities.join(', ')}` },
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

    // Get project and verify ownership
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    if (project.ownerId !== dbUser.id && dbUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Create task
    const task = await prisma.task.create({
      data: {
        projectId,
        title,
        description,
        type,
        complexity,
        status: 'open',
      },
    })

    // Calculate estimated cost
    const estimatedCost = calculateTaskCost(type, complexity)

    return NextResponse.json({
      task,
      estimatedCost,
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create task' },
      { status: 500 }
    )
  }
}
