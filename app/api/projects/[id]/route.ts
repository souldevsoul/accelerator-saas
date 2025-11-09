import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'db'
import { requireUser } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0


type Params = {
  params: Promise<{
    id: string
  }>
}

/**
 * GET /api/projects/[id]
 * Get a specific project with all details
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser()
    const { id } = await params

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        aiRuns: {
          orderBy: { createdAt: 'desc' },
        },
        tasks: {
          include: {
            assignee: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Check ownership
    if (project.ownerId !== dbUser.id && dbUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ project })
  } catch (error: any) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch project' },
      { status: 500 }
    )
  }
}
