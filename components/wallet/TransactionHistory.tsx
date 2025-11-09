import { CreditLedger } from 'db'
import { formatDistanceToNow } from 'date-fns'
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, DollarSign, Zap, User, XCircle } from 'lucide-react'

export function TransactionHistory({ transactions }: { transactions: CreditLedger[] }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">No transactions yet</p>
        <p className="text-sm text-gray-500 mt-2">Your credit transactions will appear here</p>
      </div>
    )
  }

  const getTransactionIcon = (reason: string, delta: number | bigint) => {
    if (reason.includes('purchase') || reason.includes('grant')) {
      return <ArrowUpCircle className="w-5 h-5 text-green-600" />
    }
    if (reason.includes('refund')) {
      return <RefreshCw className="w-5 h-5 text-blue-600" />
    }
    if (reason.includes('reserve')) {
      return <ArrowDownCircle className="w-5 h-5 text-orange-600" />
    }
    if (reason.includes('MVP')) {
      return <Zap className="w-5 h-5 text-violet-600" />
    }
    if (reason.includes('task') || reason.includes('Task')) {
      return <User className="w-5 h-5 text-indigo-600" />
    }
    return delta > 0 ? (
      <ArrowUpCircle className="w-5 h-5 text-green-600" />
    ) : (
      <ArrowDownCircle className="w-5 h-5 text-red-600" />
    )
  }

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
    return 'bg-gray-50'
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Type</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Description</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Amount</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={`hover:bg-gray-50 transition ${getBackgroundColor(transaction.reason)}`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.reason, transaction.delta)}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-gray-900">{transaction.reason}</p>
                  {transaction.refId && (
                    <p className="text-xs text-gray-500 mt-0.5 font-mono">{transaction.refId}</p>
                  )}
                </td>
                <td className="py-4 px-6 text-right">
                  <span className={`text-sm font-semibold ${getTransactionColor(transaction.delta)}`}>
                    {transaction.delta > 0 ? '+' : ''}
                    {Number(transaction.delta)}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="text-sm text-gray-600">
                    {formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length >= 50 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">Showing last 50 transactions</p>
        </div>
      )}
    </div>
  )
}
