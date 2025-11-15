import { auth } from '@/auth'
import { prisma } from 'db'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, FolderKanban, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  // Get or create user in database
  let dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      wallet: true,
      projects: {
        include: {
          tasks: true,
          aiRuns: {
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name || session.user.email.split('@')[0],
        wallet: {
          create: {
            balance: 100, // Welcome bonus
          },
        },
      },
      include: {
        wallet: true,
        projects: {
          include: {
            tasks: true,
            aiRuns: {
              take: 1,
              orderBy: { createdAt: 'desc' },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    })
  }

  const balance = dbUser.wallet ? Number(dbUser.wallet.balance) : 0

  // Calculate stats
  const totalProjects = dbUser.projects.length
  const activeTasks = dbUser.projects.reduce(
    (acc, project) => acc + project.tasks.filter((t) => t.status === 'in_progress').length,
    0
  )
  const completedTasks = dbUser.projects.reduce(
    (acc, project) => acc + project.tasks.filter((t) => t.status === 'done').length,
    0
  )

  return (
    <div className="h-full">
      <DashboardHeader
        title="Dashboard"
        description="Manage your projects and track progress"
        balance={balance}
        action={{
          label: 'New Project',
          href: '/dashboard/projects/new',
          icon: <Plus className="w-5 h-5 mr-2" />,
        }}
      />

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Projects</span>
              <FolderKanban className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalProjects}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Active Tasks</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{activeTasks}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Completed</span>
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{completedTasks}</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Credits</span>
              <AlertCircle className="w-5 h-5 text-sky-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{balance}</div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <Link href="/dashboard/projects">
              <Button variant="outline" size="small" type="button">View All</Button>
            </Link>
          </div>

          {dbUser.projects.length === 0 ? (
            <div className="p-12 text-center">
              <FolderKanban className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first project to get started
              </p>
              <Link href="/dashboard/projects/new">
                <Button type="button">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {dbUser.projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.repoFullName}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'active'
                            ? 'bg-blue-100 text-blue-700'
                            : project.status === 'mvp_preview'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {project.status.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {project.tasks.length} tasks
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
