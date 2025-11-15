import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'db'
import { auth } from '@/auth'
import { deployToVercel, isVercelConfigured, parseCodeToVercelFiles } from 'lib'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Params = {
  params: Promise<{
    id: string
  }>
}

/**
 * POST /api/projects/[id]/deploy
 * Deploy project to Vercel
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    console.log('[Deploy] Starting deployment request...')

    const session = await auth()

    if (!session?.user?.email) {
      console.log('[Deploy] Unauthorized - no session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = session.user
    const { id: projectId } = await params
    console.log('[Deploy] Project ID:', projectId)

    const body = await request.json()
    const { aiRunId } = body
    console.log('[Deploy] AI Run ID:', aiRunId)

    if (!aiRunId) {
      console.log('[Deploy] Missing AI Run ID')
      return NextResponse.json(
        { error: 'AI Run ID is required' },
        { status: 400 }
      )
    }

    // Get user from database
    console.log('[Deploy] Looking up user:', user.email)
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser) {
      console.log('[Deploy] User not found in database')
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get project
    console.log('[Deploy] Looking up project:', projectId)
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      console.log('[Deploy] Project not found')
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Check ownership
    if (project.ownerId !== dbUser.id) {
      console.log('[Deploy] User does not own project')
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get AI run
    console.log('[Deploy] Looking up AI run:', aiRunId)
    const aiRun = await prisma.aIRun.findUnique({
      where: { id: aiRunId },
    })

    if (!aiRun) {
      console.log('[Deploy] AI run not found')
      return NextResponse.json({ error: 'AI run not found' }, { status: 404 })
    }

    if (!aiRun.generatedCode) {
      console.log('[Deploy] No generated code in AI run')
      return NextResponse.json(
        { error: 'No generated code to deploy' },
        { status: 400 }
      )
    }

    console.log('[Deploy] Generated code length:', aiRun.generatedCode.length)

    // Check if Vercel is configured
    console.log('[Deploy] Checking Vercel configuration...')
    if (!isVercelConfigured()) {
      console.log('[Deploy] Vercel not configured')
      return NextResponse.json(
        {
          error:
            'Vercel deployment is not configured. Please set VERCEL_TOKEN in your environment variables.',
        },
        { status: 503 }
      )
    }

    // Check if already deployed
    if (aiRun.deploymentUrl) {
      console.log('[Deploy] Already deployed:', aiRun.deploymentUrl)
      return NextResponse.json({
        message: 'Already deployed',
        deploymentUrl: aiRun.deploymentUrl,
      })
    }

    // Parse generated code into Vercel deployment files
    console.log('[Deploy] Parsing generated code...')
    const deploymentOptions = parseCodeToVercelFiles(
      aiRun.generatedCode,
      project.name
    )

    console.log(
      `[Deploy] Deploying project "${project.name}" to Vercel with ${deploymentOptions.files.length} files...`
    )
    console.log('[Deploy] Files:', deploymentOptions.files.map(f => f.file).join(', '))

    // Deploy to Vercel
    console.log('[Deploy] Calling Vercel API...')
    const deployment = await deployToVercel(deploymentOptions)

    console.log(`[Deploy] Deployment created: ${deployment.url} (ID: ${deployment.id})`)

    // Update AI run with deployment URL
    console.log('[Deploy] Updating AI run with deployment info...')
    await prisma.aIRun.update({
      where: { id: aiRunId },
      data: {
        deploymentUrl: deployment.url,
        deploymentId: deployment.id,
      },
    })

    console.log('[Deploy] Deployment successful!')
    return NextResponse.json({
      success: true,
      deploymentUrl: deployment.url,
      deploymentId: deployment.id,
      status: deployment.status,
    })
  } catch (error: any) {
    console.error('[Deploy] Error:', error)
    console.error('[Deploy] Stack trace:', error.stack)
    return NextResponse.json(
      { error: error.message || 'Failed to deploy to Vercel' },
      { status: 500 }
    )
  }
}
