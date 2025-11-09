'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Zap, Loader2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function GenerateMVPButton({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch(`/api/projects/${projectId}/mvp`, {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate MVP')
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setIsGenerating(false)
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="large" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Generate MVP
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate MVP?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                This will use AI to generate a complete MVP for your project. The following will happen:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>100 credits will be deducted from your wallet</li>
                <li>A new GitHub branch will be created</li>
                <li>AI will generate production-ready code</li>
                <li>A pull request will be opened for review</li>
                <li>A live preview will be deployed</li>
              </ul>
              <p className="font-medium">Are you sure you want to continue?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate MVP'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </>
  )
}
