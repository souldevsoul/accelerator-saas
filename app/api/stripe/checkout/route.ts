import { NextRequest, NextResponse } from 'next/server'
import { requireUser } from '@/lib/supabase/server'
import { createCheckoutSession, type CreditPackageKey } from 'lib'
import { prisma } from 'db'

export const dynamic = 'force-dynamic'
export const revalidate = 0


/**
 * POST /api/stripe/checkout
 * Create a Stripe checkout session for credits purchase
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireUser()
    const body = await request.json()

    const { packageKey } = body

    if (!packageKey) {
      return NextResponse.json(
        { error: 'packageKey is required' },
        { status: 400 }
      )
    }

    // Validate package key
    const validPackages: CreditPackageKey[] = ['100', '1000', '10000']
    if (!validPackages.includes(packageKey)) {
      return NextResponse.json(
        { error: `Invalid packageKey. Must be one of: ${validPackages.join(', ')}` },
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

    // Create checkout session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const sessionUrl = await createCheckoutSession(
      dbUser.id,
      packageKey as CreditPackageKey,
      `${appUrl}/dashboard/wallet?success=true`,
      `${appUrl}/dashboard/wallet?canceled=true`
    )

    return NextResponse.json({ url: sessionUrl })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
