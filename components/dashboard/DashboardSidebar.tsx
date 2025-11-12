'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FolderKanban,
  Wallet,
  Settings,
  LogOut,
  Shield,
  Users,
  Receipt
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  adminOnly?: boolean
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: <FolderKanban className="w-5 h-5" />,
  },
  {
    name: 'Wallet',
    href: '/dashboard/wallet',
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="w-5 h-5" />,
  },
]

const adminNavigation: NavItem[] = [
  {
    name: 'Admin Dashboard',
    href: '/dashboard/admin',
    icon: <Shield className="w-5 h-5" />,
    adminOnly: true,
  },
  {
    name: 'Users',
    href: '/dashboard/admin/users',
    icon: <Users className="w-5 h-5" />,
    adminOnly: true,
  },
  {
    name: 'Transactions',
    href: '/dashboard/admin/transactions',
    icon: <Receipt className="w-5 h-5" />,
    adminOnly: true,
  },
]

export function DashboardSidebar({ userRole }: { userRole?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Accelerator</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {/* Main Navigation */}
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href + '/') && item.href !== '/dashboard')

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          )
        })}

        {/* Admin Navigation */}
        {userRole === 'admin' && (
          <>
            <div className="my-4 border-t border-gray-200"></div>
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Administration
            </div>
            {adminNavigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              )
            })}
          </>
        )}
      </nav>

      {/* Sign Out */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
