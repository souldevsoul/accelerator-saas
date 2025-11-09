import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'db'
import { requireUser } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0


/**
 * GET /api/projects
 * List all projects for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireUser()

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const projects = await prisma.project.findMany({
      where: { ownerId: dbUser.id },
      include: {
        aiRuns: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        tasks: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ projects })
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/projects
 * Create a new project
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireUser()
    const body = await request.json()

    const { name, repoFullName } = body

    if (!name || !repoFullName) {
      return NextResponse.json(
        { error: 'Name and repoFullName are required' },
        { status: 400 }
      )
    }

    // Validate repo format (owner/repo)
    if (!repoFullName.includes('/')) {
      return NextResponse.json(
        { error: 'repoFullName must be in format owner/repo' },
        { status: 400 }
      )
    }

    // Get or create user in database
    let dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.email!,
          name: user.user_metadata?.full_name || user.email!.split('@')[0],
        },
      })

      // Create wallet for new user
      await prisma.wallet.create({
        data: {
          userId: dbUser.id,
          balance: 0,
        },
      })
    }

    const project = await prisma.project.create({
      data: {
        ownerId: dbUser.id,
        name,
        repoFullName,
        status: 'mvp_pending',
      },
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    )
  }
}
