import { requireUser } from '@/lib/supabase/server'
import { prisma } from 'db'
import { redirect, notFound } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Button } from '@/components/ui/button'
import { GenerateMVPButton } from '@/components/projects/GenerateMVPButton'
import { CreateTaskDialog } from '@/components/projects/CreateTaskDialog'
import { TaskList } from '@/components/projects/TaskList'
import { GitBranch, ExternalLink, Zap } from 'lucide-react'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const user = await requireUser().catch(() => {
    redirect('/login')
  })

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    include: {
      wallet: true,
    },
  })

  if (!dbUser) {
    redirect('/login')
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      aiRuns: {
        orderBy: { createdAt: 'desc' },
      },
      tasks: {
        include: {
          assignee: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!project) {
    notFound()
  }

  // Check ownership
  if (project.ownerId !== dbUser.id && dbUser.role !== 'admin') {
    redirect('/dashboard/projects')
  }

  const balance = dbUser.wallet ? Number(dbUser.wallet.balance) : 0
  const latestMVP = project.aiRuns.find((run) => run.kind === 'mvp')
  const hasMVP = latestMVP?.status === 'completed'

  return (
    <div className="h-full">
      <DashboardHeader
        title={project.name}
        description={project.repoFullName}
        balance={balance}
      />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* MVP Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">MVP Status</h2>
                  <p className="text-sm text-gray-600">
                    {hasMVP ? 'Your MVP has been generated' : 'Generate your MVP to get started'}
                  </p>
                </div>
                {!hasMVP && <GenerateMVPButton projectId={project.id} />}
              </div>

              {latestMVP ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          latestMVP.status === 'completed'
                            ? 'bg-blue-500'
                            : latestMVP.status === 'running'
                            ? 'bg-blue-500 animate-pulse'
                            : latestMVP.status === 'failed'
                            ? 'bg-red-500'
                            : 'bg-gray-400'
                        }`}
                      />
                      <div>
                        <div className="font-medium text-gray-900 capitalize">
                          {latestMVP.status}
                        </div>
                        <div className="text-sm text-gray-500">
                          {latestMVP.costCredits} credits used
                        </div>
                      </div>
                    </div>
                    {latestMVP.prUrl && (
                      <a
                        href={latestMVP.prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        View PR
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </div>

                  {latestMVP.previewUrl && (
                    <a
                      href={latestMVP.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:border-blue-300 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Zap className="w-5 h-5 text-blue-600 mr-3" />
                          <div>
                            <div className="font-medium text-blue-900">Live Preview</div>
                            <div className="text-sm text-blue-600">
                              Click to view your MVP
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-blue-600" />
                      </div>
                    </a>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                  <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No MVP generated yet. Click "Generate MVP" to create your first version.
                  </p>
                </div>
              )}
            </div>

            {/* Tasks Section */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Tasks</h2>
                  <p className="text-sm text-gray-600">
                    {project.tasks.length} total tasks
                  </p>
                </div>
                <CreateTaskDialog projectId={project.id} />
              </div>

              <TaskList tasks={project.tasks} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Project Info</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Repository</div>
                  <a
                    href={`https://github.com/${project.repoFullName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <GitBranch className="w-4 h-4 mr-1" />
                    {project.repoFullName}
                  </a>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
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
                <div>
                  <div className="text-sm text-gray-600 mb-1">Created</div>
                  <div className="text-sm text-gray-900">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Task Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Task Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Open</span>
                  <span className="font-semibold text-gray-900">
                    {project.tasks.filter((t) => t.status === 'open').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="font-semibold text-blue-600">
                    {project.tasks.filter((t) => t.status === 'in_progress' || t.status === 'assigned').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-blue-600">
                    {project.tasks.filter((t) => t.status === 'done').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Canceled</span>
                  <span className="font-semibold text-gray-600">
                    {project.tasks.filter((t) => t.status === 'canceled').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
