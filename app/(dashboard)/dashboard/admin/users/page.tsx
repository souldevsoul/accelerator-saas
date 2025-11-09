import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from 'db'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { UsersTable } from '@/components/admin/UsersTable'

// Force dynamic rendering to avoid DB access during build
export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
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

  // Fetch all users with their wallets and project counts
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      wallet: true,
      _count: {
        select: {
          projects: true,
        },
      },
    },
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="User Management"
          description="View and manage all users in the system"
        />

        <UsersTable users={users} />
      </div>
    </div>
  )
}
