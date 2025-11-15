import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context.params
    const keyId = params.id

    // Verify the API key belongs to the user
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: keyId },
      select: { userId: true },
    })

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 })
    }

    if (apiKey.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Not authorized to delete this API key' },
        { status: 403 }
      )
    }

    // Delete the API key
    await prisma.apiKey.delete({
      where: { id: keyId },
    })

    return NextResponse.json({
      message: 'API key deleted successfully',
    })
  } catch (error) {
    console.error('API key deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    )
  }
}
