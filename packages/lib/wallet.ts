import { prisma } from 'db'

export class InsufficientCreditsError extends Error {
  constructor(required: number, available: number) {
    super(`Insufficient credits. Required: ${required}, Available: ${available}`)
    this.name = 'InsufficientCreditsError'
  }
}

/**
 * Reserve credits from a user's wallet (atomic transaction)
 * @param userId - The user ID
 * @param amount - Amount of credits to reserve (positive number)
 * @param reason - Reason for the reservation
 * @param refId - Optional reference ID (task ID, ai_run ID, etc.)
 */
export async function reserveCredits(
  userId: string,
  amount: number,
  reason: string,
  refId?: string
): Promise<void> {
  if (amount <= 0) {
    throw new Error('Amount must be positive')
  }

  await prisma.$transaction(async (tx) => {
    // Get current wallet balance
    const wallet = await tx.wallet.findUnique({
      where: { userId },
      select: { balance: true },
    })

    if (!wallet) {
      throw new Error('Wallet not found')
    }

    const balance = Number(wallet.balance)

    if (balance < amount) {
      throw new InsufficientCreditsError(amount, balance)
    }

    // Create ledger entry (negative delta for debit)
    await tx.creditLedger.create({
      data: {
        userId,
        delta: BigInt(-amount),
        reason,
        refId,
      },
    })

    // Update wallet balance
    await tx.wallet.update({
      where: { userId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    })
  })
}

/**
 * Refund credits to a user's wallet (atomic transaction)
 * @param userId - The user ID
 * @param amount - Amount of credits to refund (positive number)
 * @param reason - Reason for the refund
 * @param refId - Optional reference ID
 */
export async function refundCredits(
  userId: string,
  amount: number,
  reason: string,
  refId?: string
): Promise<void> {
  if (amount <= 0) {
    throw new Error('Amount must be positive')
  }

  await prisma.$transaction(async (tx) => {
    // Create ledger entry (positive delta for credit)
    await tx.creditLedger.create({
      data: {
        userId,
        delta: BigInt(amount),
        reason,
        refId,
      },
    })

    // Update wallet balance
    await tx.wallet.update({
      where: { userId },
      data: {
        balance: {
          increment: amount,
        },
      },
    })
  })
}

/**
 * Add credits to a user's wallet (from purchase, grant, etc.)
 * @param userId - The user ID
 * @param amount - Amount of credits to add
 * @param source - Source of the credits (e.g., 'stripe_payment', 'signup_bonus')
 * @param externalRef - External reference (e.g., Stripe payment intent ID)
 */
export async function addCredits(
  userId: string,
  amount: number,
  source: string,
  externalRef?: string
): Promise<void> {
  if (amount <= 0) {
    throw new Error('Amount must be positive')
  }

  await prisma.$transaction(async (tx) => {
    // Ensure wallet exists (create if not)
    await tx.wallet.upsert({
      where: { userId },
      create: {
        userId,
        balance: BigInt(amount),
      },
      update: {
        balance: {
          increment: amount,
        },
      },
    })

    // Create credit grant record
    await tx.creditGrant.create({
      data: {
        userId,
        amount: BigInt(amount),
        source,
        externalRef,
      },
    })

    // Create ledger entry
    await tx.creditLedger.create({
      data: {
        userId,
        delta: BigInt(amount),
        reason: `credit_topup:${source}`,
        refId: externalRef,
      },
    })
  })
}

/**
 * Get user's wallet balance
 * @param userId - The user ID
 * @returns Current balance as a number
 */
export async function getBalance(userId: string): Promise<number> {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    select: { balance: true },
  })

  return wallet ? Number(wallet.balance) : 0
}

/**
 * Get user's credit ledger (transaction history)
 * @param userId - The user ID
 * @param limit - Number of records to fetch
 * @returns Array of ledger entries
 */
export async function getLedger(userId: string, limit = 50) {
  return prisma.creditLedger.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

/**
 * Get user's credit grants (top-up history)
 * @param userId - The user ID
 * @param limit - Number of records to fetch
 * @returns Array of grant entries
 */
export async function getGrants(userId: string, limit = 50) {
  return prisma.creditGrant.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}
