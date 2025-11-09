'use client'

import { useState } from 'react'
import { CreditLedger, User } from 'db'
import { formatDistanceToNow } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Search, ArrowUpCircle, ArrowDownCircle, User as UserIcon } from 'lucide-react'

type TransactionWithUser = CreditLedger & {
  user: Pick<User, 'id' | 'email' | 'name'>
}

export function TransactionsTable({ transactions }: { transactions: TransactionWithUser[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = transactions.filter((transaction) => {
    const query = searchQuery.toLowerCase()
    return (
      transaction.user.email.toLowerCase().includes(query) ||
      transaction.user.name?.toLowerCase().includes(query) ||
      transaction.reason.toLowerCase().includes(query) ||
      transaction.refId?.toLowerCase().includes(query)
    )
  })

  const getTransactionColor = (delta: number | bigint) => {
    return delta > 0 ? 'text-green-600' : 'text-red-600'
  }

  const getBackgroundColor = (reason: string) => {
    if (reason.includes('purchase') || reason.includes('grant')) {
      return 'bg-green-50'
    }
    if (reason.includes('refund')) {
      return 'bg-blue-50'
    }
    if (reason.includes('reserve')) {
      return 'bg-orange-50'
    }
    if (reason.includes('MVP')) {
      return 'bg-violet-50'
    }
    return 'bg-white'
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by user, reason, or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">User</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Reason</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Amount</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`hover:bg-gray-50 transition ${getBackgroundColor(transaction.reason)}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-violet-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {transaction.user.name || 'No name'}
                        </p>
                        <p className="text-xs text-gray-600">{transaction.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-900">{transaction.reason}</p>
                    {transaction.refId && (
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{transaction.refId}</p>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {transaction.delta > 0 ? (
                        <ArrowUpCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-semibold ${getTransactionColor(transaction.delta)}`}>
                        {transaction.delta > 0 ? '+' : ''}
                        {Number(transaction.delta)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-sm text-gray-600">
                      {formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filteredTransactions.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
        </div>
      )}
    </div>
  )
}
