import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from 'db'

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Delete user and all related data (cascading deletes in Prisma schema)
    await prisma.user.delete({
      where: { id: dbUser.id },
    })

    // Delete from Supabase Auth
    const { error } = await supabase.auth.admin.deleteUser(user.id)
    if (error) {
      console.error('Failed to delete from Supabase Auth:', error)
      // Continue anyway since we've deleted from our database
    }

    // Sign out
    await supabase.auth.signOut()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Failed to delete account:', error)
    return NextResponse.json({ error: error.message || 'Failed to delete account' }, { status: 500 })
  }
}
