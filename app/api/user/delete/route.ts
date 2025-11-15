import { NextRequest, NextResponse } from 'next/server'
import { auth, signOut } from '@/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Delete user and all related data (cascading deletes in Prisma schema)
    // This will delete:
    // - Projects and AI runs
    // - Tasks
    // - Wallet and credit history
    // - Notifications
    // - API keys
    // - Sessions and accounts
    await prisma.user.delete({
      where: { id: user.id },
    })

    // Sign out the user
    await signOut({ redirect: false })

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully'
    })
  } catch (error: any) {
    console.error('Failed to delete account:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete account' },
      { status: 500 }
    )
  }
}
