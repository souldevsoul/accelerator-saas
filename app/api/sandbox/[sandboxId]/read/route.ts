import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { sandboxManager } from '@/lib/sandbox/sandbox-manager'
import { prisma } from 'db'
import { VercelProvider } from '@/lib/sandbox/providers/vercel-provider'

export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{ sandboxId: string }>
}

/**
 * GET /api/sandbox/[sandboxId]/read?path=...
 * Read a file from the sandbox
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sandboxId } = await context.params
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('path')

    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      )
    }

    // Try to get sandbox provider from manager
    let provider = sandboxManager.getProvider(sandboxId)

    // If not found, try to reconnect
    if (!provider) {
      console.log(\`[API] Provider not found in manager, attempting reconnect to \${sandboxId}\`)

      // Find the AIRun with this sandboxId to get previewUrl
      const aiRun = await prisma.aIRun.findFirst({
        where: { sandboxId },
        select: { previewUrl: true }
      })

      if (!aiRun) {
        return NextResponse.json(
          { error: 'Sandbox not found' },
          { status: 404 }
        )
      }

      // Create new provider and reconnect
      provider = new VercelProvider({})
      await provider.reconnect(sandboxId, aiRun.previewUrl || undefined)

      // Register in manager for future use
      sandboxManager.registerSandbox(sandboxId, provider)
      console.log(\`[API] Successfully reconnected to sandbox \${sandboxId}\`)
    }

    // Read file content
    const content = await provider.readFile(filePath)

    return NextResponse.json({ content })
  } catch (error: any) {
    console.error('Error reading file:', error)

    // Handle sandbox stopped error (410)
    if (error?.message?.includes('stopped') || error?.message?.includes('no longer available')) {
      // Remove from manager since sandbox is dead
      sandboxManager.removeSandbox(sandboxId)

      return NextResponse.json(
        {
          error: 'Sandbox has stopped',
          message: 'This sandbox is no longer active. The sandbox may have timed out.',
          stopped: true
        },
        { status: 410 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Failed to read file' },
      { status: 500 }
    )
  }
}
