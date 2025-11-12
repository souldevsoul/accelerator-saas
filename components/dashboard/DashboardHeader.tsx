'use client'

import { Wallet, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DashboardHeaderProps {
  title: string
  description?: string
  balance?: number
  action?: {
    label: string
    href: string
    icon?: React.ReactNode
  }
}

export function DashboardHeader({ title, description, balance, action }: DashboardHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-gray-600">{description}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Wallet Balance */}
          {balance !== undefined && (
            <Link
              href="/dashboard/wallet"
              className="flex items-center px-4 py-2 bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200 rounded-lg hover:border-blue-300 transition"
            >
              <Wallet className="w-5 h-5 text-blue-600 mr-2" />
              <div className="text-left">
                <div className="text-xs text-blue-600 font-medium">Balance</div>
                <div className="text-lg font-bold text-blue-700">
                  {balance.toLocaleString()}
                </div>
              </div>
            </Link>
          )}

          {/* Action Button */}
          {action && (
            <Button asChild size="large">
              <Link href={action.href}>
                {action.icon}
                {action.label}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
