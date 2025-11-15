import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { randomBytes } from 'crypto'
import { z } from 'zod'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const createApiKeySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  expiresAt: z.string().datetime().optional(),
})

// Generate a secure API key
function generateApiKey(): string {
  const prefix = 'nmb' // Nimbus prefix
  const randomPart = randomBytes(32).toString('base64url')
  return `${prefix}_${randomPart}`
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = createApiKeySchema.parse(body)

    // Generate a unique API key
    const key = generateApiKey()

    // Create API key in database
    const apiKey = await prisma.apiKey.create({
      data: {
        userId: session.user.id,
        name: validatedData.name,
        key,
        expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : null,
      },
    })

    return NextResponse.json({
      message: 'API key created successfully',
      key: apiKey.key, // Return the full key only once at creation
      id: apiKey.id,
      name: apiKey.name,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('API key creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        key: true, // Note: In production, you might want to mask this
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true,
      },
    })

    return NextResponse.json(apiKeys)
  } catch (error) {
    console.error('API keys fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    )
  }
}
