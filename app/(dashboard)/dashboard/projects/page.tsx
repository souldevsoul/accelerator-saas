import { auth } from '@/auth'
import { prisma } from 'db'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import Link from 'next/link'
import { Plus, FolderKanban, GitBranch, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function ProjectsPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
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
      },
    },
  })

  if (!dbUser) {
    redirect('/login')
  }

  const balance = dbUser.wallet ? Number(dbUser.wallet.balance) : 0

  return (
    <div className="h-full">
      <DashboardHeader
        title="Projects"
        description={`${dbUser.projects.length} total projects`}
        balance={balance}
        action={{
          label: 'New Project',
          href: '/dashboard/projects/new',
          icon: <Plus className="w-5 h-5 mr-2" />,
        }}
      />

      <div className="p-8">
        {dbUser.projects.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FolderKanban className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first project and generate an MVP to get started
            </p>
            <Link href="/dashboard/projects/new">
              <Button size="large" type="button">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {dbUser.projects.map((project) => {
              const activeTasks = project.tasks.filter((t) => t.status === 'in_progress' || t.status === 'assigned').length
              const completedTasks = project.tasks.filter((t) => t.status === 'done').length
              const latestRun = project.aiRuns[0]

              return (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition group"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                          {project.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <GitBranch className="w-4 h-4 mr-1" />
                          {project.repoFullName}
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          project.status === 'active'
                            ? 'bg-blue-100 text-blue-700'
                            : project.status === 'mvp_preview'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Total Tasks</div>
                        <div className="text-2xl font-bold text-gray-900">{project.tasks.length}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Completed</div>
                        <div className="text-2xl font-bold text-blue-600">{completedTasks}</div>
                      </div>
                    </div>

                    {/* Active Tasks */}
                    {activeTasks > 0 && (
                      <div className="flex items-center text-sm text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                        <Clock className="w-4 h-4 mr-2" />
                        {activeTasks} active {activeTasks === 1 ? 'task' : 'tasks'}
                      </div>
                    )}

                    {/* Latest MVP */}
                    {latestRun && latestRun.status === 'completed' && latestRun.prUrl && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <a
                          href={latestRun.prUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View MVP PR →
                        </a>
                      </div>
                    )}

                    {/* Created Date */}
                    <div className="mt-4 text-xs text-gray-500">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
