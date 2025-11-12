import { LucideIcon } from 'lucide-react'

type StatCard = {
  title: string
  value: number
  icon: LucideIcon
  color: 'violet' | 'blue' | 'indigo' | 'green'
}

export function AdminStats({ stats }: { stats: StatCard[] }) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'violet':
        return 'bg-blue-100 text-blue-600'
      case 'blue':
        return 'bg-blue-100 text-blue-600'
      case 'indigo':
        return 'bg-blue-100 text-blue-600'
      case 'green':
        return 'bg-blue-100 text-blue-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.title} className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
