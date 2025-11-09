import { Task, User } from 'db'
import { AssignTaskDialog } from './AssignTaskDialog'
import { CancelTaskButton } from './CancelTaskButton'
import { ExternalLink, User as UserIcon, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react'

type TaskWithAssignee = Task & {
  assignee: Pick<User, 'id' | 'email' | 'name'> | null
}

export function TaskList({ tasks }: { tasks: TaskWithAssignee[] }) {
  if (tasks.length === 0) {
    return (
      <div className="p-12 text-center">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">No tasks yet. Create your first task to get started.</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-700'
      case 'in_progress':
      case 'assigned':
        return 'bg-blue-100 text-blue-700'
      case 'awaiting_review':
        return 'bg-yellow-100 text-yellow-700'
      case 'canceled':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="w-4 h-4" />
      case 'in_progress':
      case 'assigned':
        return <Clock className="w-4 h-4" />
      case 'canceled':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-violet-100 text-violet-700'
      case 'bug':
        return 'bg-red-100 text-red-700'
      case 'content':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <div key={task.id} className="p-6 hover:bg-gray-50 transition">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(task.type)}`}>
                  {task.type}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                  {task.complexity}
                </span>
              </div>
              {task.description && (
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              {/* Status */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${getStatusColor(task.status)}`}>
                {getStatusIcon(task.status)}
                <span className="font-medium capitalize">{task.status.replace('_', ' ')}</span>
              </div>

              {/* Assignee */}
              {task.assignee && (
                <div className="flex items-center text-gray-600">
                  <UserIcon className="w-4 h-4 mr-1.5" />
                  <span>{task.assignee.name || task.assignee.email}</span>
                </div>
              )}

              {/* Credits */}
              {task.reservedCredits > 0 && (
                <div className="text-gray-600">
                  <span className="font-medium">{task.reservedCredits}</span> credits
                </div>
              )}

              {/* PR Link */}
              {task.githubPrUrl && (
                <a
                  href={task.githubPrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-violet-600 hover:text-violet-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  View PR
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {task.status === 'open' && (
                <AssignTaskDialog taskId={task.id} estimatedCost={task.reservedCredits || 0} />
              )}
              {(task.status === 'assigned' || task.status === 'in_progress') && (
                <CancelTaskButton taskId={task.id} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
