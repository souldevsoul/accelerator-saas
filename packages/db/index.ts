import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient | null }

// Lazy initialization to avoid errors during build
let _prisma: PrismaClient | null = null

function getPrisma(): PrismaClient {
  if (_prisma) return _prisma

  if (globalForPrisma.prisma) {
    _prisma = globalForPrisma.prisma
    return _prisma
  }

  try {
    _prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = _prisma
    }

    return _prisma
  } catch (error) {
    // During build, Prisma might not be able to initialize
    // Return a proxy that will fail at runtime if actually used
    console.warn('Prisma Client could not be initialized:', error)
    throw error
  }
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return getPrisma()[prop as keyof PrismaClient]
  },
})

export * from '@prisma/client'
export * from './pricing'
