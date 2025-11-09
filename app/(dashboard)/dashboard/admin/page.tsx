import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from 'db'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { AdminStats } from '@/components/admin/AdminStats'
import { RecentActivity } from '@/components/admin/RecentActivity'
import { Users, FolderKanban, DollarSign, Zap } from 'lucide-react'

export default async function AdminDashboardPage() {
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

  // Fetch admin statistics
  const [
    totalUsers,
    totalProjects,
    totalTasks,
    totalCreditsInSystem,
    totalRevenue,
    recentUsers,
    recentProjects,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.task.count(),
    prisma.wallet.aggregate({
      _sum: { balance: true },
    }),
    prisma.creditLedger.aggregate({
      _sum: { delta: true },
      where: { reason: { contains: 'Stripe purchase' } },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    }),
  ])

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'violet',
    },
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: FolderKanban,
      color: 'blue',
    },
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: Zap,
      color: 'indigo',
    },
    {
      title: 'Credits in System',
      value: totalCreditsInSystem._sum.balance || 0,
      icon: DollarSign,
      color: 'green',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Admin Dashboard"
          description="System overview and management"
        />

        {/* Stats Grid */}
        <AdminStats stats={stats} />

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <RecentActivity
            title="Recent Users"
            items={recentUsers.map((u) => ({
              id: u.id,
              primary: u.name || u.email,
              secondary: u.email,
              badge: u.role,
              time: u.createdAt,
            }))}
          />
          <RecentActivity
            title="Recent Projects"
            items={recentProjects.map((p) => ({
              id: p.id,
              primary: p.name,
              secondary: `by ${p.user.name || p.user.email}`,
              badge: p.githubRepo,
              time: p.createdAt,
            }))}
          />
        </div>
      </div>
    </div>
  )
}
