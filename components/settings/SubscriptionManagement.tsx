'use client'

import { useState, useEffect } from 'react'
import { Wallet } from 'db'
import { Button } from '@/components/ui/button'
import { CreditPackages } from '@/components/wallet/CreditPackages'
import { Loader2, Wallet as WalletIcon, TrendingUp, TrendingDown, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface Transaction {
  id: string
  delta: string
  reason: string
  createdAt: Date
}

export function SubscriptionManagement({
  userId,
  wallet,
}: {
  userId: string
  wallet: Wallet | null
}) {
  const [showPackages, setShowPackages] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/user/transactions')
      if (response.ok) {
        const data = await response.json()
        setTransactions(data.transactions.slice(0, 5)) // Show last 5 transactions
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCredits = (amount: string | bigint | number) => {
    const num = typeof amount === 'bigint' ? Number(amount) : typeof amount === 'string' ? Number(amount) : amount
    return num.toLocaleString()
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const balance = wallet?.balance ? Number(wallet.balance) : 0

  return (
    <div className="space-y-6">
      {/* Current Balance */}
      <div className="flex items-start gap-3 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <WalletIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-900 mb-1">Current Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-900">
              {formatCredits(balance)}
            </span>
            <span className="text-lg text-blue-700">credits</span>
          </div>
          <p className="text-sm text-blue-700 mt-2">
            Use credits to generate MVPs, complete tasks, and access AI features
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <Link href="/dashboard/wallet">
            <Button variant="ghost" size="small">
              View All
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 mb-2">No transactions yet</p>
            <p className="text-sm text-gray-500">Purchase credits to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const delta = Number(transaction.delta)
              const isPositive = delta > 0

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isPositive ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.reason}</p>
                      <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {formatCredits(delta)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Buy More Credits */}
      <div>
        <Button
          onClick={() => setShowPackages(!showPackages)}
          className="w-full sm:w-auto"
          variant={showPackages ? 'outline' : 'primary'}
        >
          {showPackages ? 'Hide' : 'Buy More Credits'}
        </Button>

        {showPackages && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Packages</h3>
            <CreditPackages userId={userId} />
          </div>
        )}
      </div>

      {/* Billing Info */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Credits are non-refundable and do not expire. All purchases are one-time payments with no recurring charges.
        </p>
      </div>
    </div>
  )
}
