import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from 'db'

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, email } = body

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { email: user.email! },
      data: {
        name: name || undefined,
        email: email || undefined,
      },
    })

    // If email changed, update in Supabase Auth too
    if (email && email !== user.email) {
      const { error } = await supabase.auth.updateUser({ email })
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
    }

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error('Failed to update profile:', error)
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 500 })
  }
}
