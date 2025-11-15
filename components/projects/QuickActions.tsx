'use client'

interface QuickActionsProps {
  projectName: string
  generatedCode?: string | null
}

export function QuickActions({ projectName, generatedCode }: QuickActionsProps) {
  const handleDownload = () => {
    if (!generatedCode) return

    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    alert('Share functionality coming soon!')
  }

  const handleDelete = () => {
    // TODO: Implement delete functionality
    if (confirm('Are you sure you want to delete this project?')) {
      alert('Delete functionality coming soon!')
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {generatedCode && (
          <button
            onClick={handleDownload}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            Download Code
          </button>
        )}
        <button
          onClick={handleShare}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
        >
          Share Project
        </button>
        <button
          onClick={handleDelete}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          Delete Project
        </button>
      </div>
    </div>
  )
}
