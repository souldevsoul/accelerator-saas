'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    repoFullName: '',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          repoFullName: formData.repoFullName,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create project')
      }

      const { project } = await response.json()
      router.push(`/dashboard/projects/${project.id}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full">
      <DashboardHeader title="Create New Project" description="Set up a new project and generate your MVP" />

      <div className="p-8">
        <div className="max-w-2xl">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="My Awesome SaaS"
                  required
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Give your project a descriptive name
                </p>
              </div>

              {/* GitHub Repository */}
              <div>
                <label htmlFor="repo" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Repository
                </label>
                <Input
                  id="repo"
                  type="text"
                  value={formData.repoFullName}
                  onChange={(e) => setFormData({ ...formData, repoFullName: e.target.value })}
                  placeholder="username/repository-name"
                  required
                  pattern="[a-zA-Z0-9-]+/[a-zA-Z0-9-]+"
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Format: owner/repo (e.g., johndoe/my-saas)
                </p>
              </div>

              {/* Description (optional, for future use) */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what your MVP should do..."
                  rows={4}
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This will be used when generating your MVP
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Your project will be created</li>
                  <li>• You'll be able to generate an MVP (costs 100 credits)</li>
                  <li>• A GitHub branch and PR will be created automatically</li>
                  <li>• You can create and assign tasks to build features</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4">
                <Button type="button" variant="outline" asChild disabled={isLoading}>
                  <Link href="/dashboard/projects">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Project'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
