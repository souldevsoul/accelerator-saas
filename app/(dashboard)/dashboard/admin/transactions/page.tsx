import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from 'db'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { TransactionsTable } from '@/components/admin/TransactionsTable'

// Force dynamic rendering to avoid DB access during build
export const dynamic = 'force-dynamic'

export default async function AdminTransactionsPage() {
  const supabase = await createClient()

  // Beta: Skip auth check if Supabase not configured
  let user = null
  let dbUser = null

  if (supabase) {
    const { data } = await supabase.auth.getUser()
    user = data.user

    if (!user) {
      redirect('/login')
    }

    dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser || dbUser.role !== 'admin') {
      redirect('/dashboard')
    }
  }

  // Fetch all transactions with user information
  const transactions = await prisma.creditLedger.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  })

  // Calculate total stats
  const totalStats = await prisma.creditLedger.aggregate({
    _sum: {
      delta: true,
    },
    where: {
      delta: {
        gt: 0,
      },
    },
  })

  const totalSpent = await prisma.creditLedger.aggregate({
    _sum: {
      delta: true,
    },
    where: {
      delta: {
        lt: 0,
      },
    },
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Transaction History"
          description="View all credit transactions in the system"
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Credits Earned</p>
            <p className="text-3xl font-bold text-blue-600">
              +{totalStats._sum.delta?.toLocaleString() || 0}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Credits Spent</p>
            <p className="text-3xl font-bold text-red-600">
              {totalSpent._sum.delta?.toLocaleString() || 0}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Transactions</p>
            <p className="text-3xl font-bold text-gray-900">
              {transactions.length}
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  )
}
