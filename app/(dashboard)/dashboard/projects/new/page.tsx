'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'

const AI_MODELS = [
  { value: 'CLAUDE', label: 'Claude (Anthropic)', description: 'Best for complex reasoning and code generation' },
  { value: 'OPENAI', label: 'GPT-4 (OpenAI)', description: 'Versatile and creative solutions' },
  { value: 'GEMINI', label: 'Gemini (Google)', description: 'Fast and efficient generation' },
  { value: 'GROQ', label: 'Groq', description: 'Ultra-fast inference' },
] as const

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    prompt: '',
    aiModel: 'CLAUDE',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Create project and start generation in one step
      const response = await fetch('/api/projects/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          aiModel: formData.aiModel,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate project')
      }

      const { project } = await response.json()
      // Redirect to project page with generation in progress
      router.push(`/dashboard/projects/${project.id}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full">
      <DashboardHeader title="Generate New Project" description="Describe your project and let AI build it for you" />

      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Prompt */}
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to build?
                </label>
                <Textarea
                  id="prompt"
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  placeholder="Landing page for SaaS product with pricing table, testimonials, and contact form..."
                  rows={6}
                  required
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Describe your project in detail. The more specific you are, the better results you'll get.
                </p>
              </div>

              {/* AI Model Selection */}
              <div>
                <label htmlFor="aiModel" className="block text-sm font-medium text-gray-700 mb-2">
                  AI Model
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {AI_MODELS.map((model) => (
                    <label
                      key={model.value}
                      className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                        formData.aiModel === model.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="aiModel"
                        value={model.value}
                        checked={formData.aiModel === model.value}
                        onChange={(e) => setFormData({ ...formData, aiModel: e.target.value })}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-gray-900">{model.label}</div>
                        <div className="text-sm text-gray-500">{model.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  What happens next?
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• AI will generate a complete project based on your description</li>
                  <li>• Generation takes 1-3 minutes (costs 100 credits)</li>
                  <li>• You'll see a live preview of your project</li>
                  <li>• You can deploy to Vercel with one click</li>
                  <li>• Code will be ready to download or push to GitHub</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4">
                <Link href="/dashboard/projects">
                  <Button type="button" variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading} size="large">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Project
                    </>
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
