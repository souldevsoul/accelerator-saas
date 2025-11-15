import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Re-export Prisma types
export type {
  User,
  Project,
  Task,
  CreditLedger,
  Notification,
  AIRun,
  Wallet,
  ApiKey
} from '@prisma/client'

// Credit costs
export const MVP_COST = 25 // Cost in credits for generating an MVP

// Calculate task cost based on type and complexity
export function calculateTaskCost(type: string, complexity: string): number {
  const baseRates = {
    feature: 100,
    bugfix: 50,
    refactor: 150,
    test: 75,
    documentation: 25,
  }

  const complexityMultipliers = {
    low: 1,
    medium: 2,
    high: 3,
  }

  const baseRate = baseRates[type as keyof typeof baseRates] || 100
  const multiplier = complexityMultipliers[complexity as keyof typeof complexityMultipliers] || 1

  return baseRate * multiplier
}
