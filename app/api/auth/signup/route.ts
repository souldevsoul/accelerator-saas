import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
    })

    // Create wallet for the user with 50 free credits
    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: BigInt(50),
        currency: 'CREDITS',
      },
    })

    // Create a credit grant for the signup bonus
    await prisma.creditGrant.create({
      data: {
        userId: user.id,
        amount: BigInt(50),
        source: 'signup_bonus',
      },
    })

    // Create a ledger entry for the signup bonus
    await prisma.creditLedger.create({
      data: {
        userId: user.id,
        delta: BigInt(50),
        reason: 'Sign up bonus - 50 free credits',
      },
    })

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    )
  }
}
