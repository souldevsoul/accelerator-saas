import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from 'db'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { UsersTable } from '@/components/admin/UsersTable'

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  })

  if (!dbUser || dbUser.role !== 'admin') {
    redirect('/dashboard')
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
