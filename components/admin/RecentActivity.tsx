import { formatDistanceToNow } from 'date-fns'
import { Clock } from 'lucide-react'

type ActivityItem = {
  id: string
  primary: string
  secondary: string
  badge: string
  time: Date
}

export function RecentActivity({ title, items }: { title: string; items: ActivityItem[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No activity yet</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.primary}</p>
                <p className="text-sm text-gray-600 truncate">{item.secondary}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-mono truncate max-w-[200px]">
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(item.time), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
