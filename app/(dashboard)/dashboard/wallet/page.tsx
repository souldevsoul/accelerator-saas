import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from 'db'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { CreditPackages } from '@/components/wallet/CreditPackages'
import { TransactionHistory } from '@/components/wallet/TransactionHistory'
import { TestAddCredits } from '@/components/wallet/TestAddCredits'
import { Wallet as WalletIcon, TrendingUp, TrendingDown, Clock } from 'lucide-react'

// Force dynamic rendering to avoid DB access during build
export const dynamic = 'force-dynamic'

export default async function WalletPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      wallet: true,
    },
  })

  if (!dbUser) {
    redirect('/login')
  }

  // Create wallet if it doesn't exist
  if (!dbUser.wallet) {
    await prisma.wallet.create({
      data: {
        userId: dbUser.id,
        balance: BigInt(0),
        currency: 'CREDITS',
      },
    })

    // Reload user with wallet
    const updatedUser = await prisma.user.findUnique({
      where: { id: dbUser.id },
      include: {
        wallet: true,
      },
    })

    if (!updatedUser?.wallet) {
      throw new Error('Failed to create wallet')
    }

    dbUser.wallet = updatedUser.wallet
  }

  // Get transaction history
  const transactions = await prisma.creditLedger.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  // Calculate stats
  const totalEarned = transactions
    .filter((t) => t.delta > 0)
    .reduce((sum, t) => sum + Number(t.delta), 0)

  const totalSpent = transactions
    .filter((t) => t.delta < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.delta)), 0)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Wallet"
          description="Manage your credits and view transaction history"
        />

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Balance */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <WalletIcon className="w-6 h-6" />
              </div>
              <div className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">
                Available
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium opacity-90">Current Balance</p>
              <p className="text-4xl font-bold">{Number(dbUser.wallet.balance)}</p>
              <p className="text-xs opacity-75">credits</p>
            </div>
          </div>

          {/* Total Earned */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Earned</p>
              <p className="text-3xl font-bold text-gray-900">{totalEarned}</p>
              <p className="text-xs text-gray-500">credits</p>
            </div>
          </div>

          {/* Total Spent */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900">{totalSpent}</p>
              <p className="text-xs text-gray-500">credits</p>
            </div>
          </div>
        </div>

        {/* Test Tools (Development Only) */}
        <TestAddCredits />

        {/* Buy Credits Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Buy Credits</h2>
          <CreditPackages userId={dbUser.id} />
        </div>

        {/* Transaction History */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          </div>
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
