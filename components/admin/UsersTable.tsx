'use client'

import { useState } from 'react'
import { User, Wallet } from 'db'
import { formatDistanceToNow } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Search, User as UserIcon, Wallet as WalletIcon, FolderKanban, Crown, Shield, UserCog } from 'lucide-react'

type UserWithWallet = User & {
  wallet: Wallet | null
  _count: {
    projects: number
  }
}

export function UsersTable({ users }: { users: UserWithWallet[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase()
    return (
      user.email.toLowerCase().includes(query) ||
      user.name?.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-600" />
      case 'executor':
        return <UserCog className="w-4 h-4 text-blue-600" />
      default:
        return <UserIcon className="w-4 h-4 text-gray-600" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-100 text-yellow-700'
      case 'executor':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by email, name, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">User</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Role</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Credits</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Projects</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name || 'No name'}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                      {getRoleIcon(user.role)}
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <WalletIcon className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{user.wallet?.balance || 0}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <FolderKanban className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{user._count.projects}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-sm text-gray-600">
                      {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filteredUsers.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      )}
    </div>
  )
}
