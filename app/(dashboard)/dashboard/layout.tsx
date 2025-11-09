import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { requireUser } from '@/lib/supabase/server'
import { prisma } from 'db'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser().catch(() => {
    redirect('/login')
  })

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  })

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0">
        <DashboardSidebar userRole={dbUser?.role} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
