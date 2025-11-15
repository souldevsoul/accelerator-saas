'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, ExternalLink } from 'lucide-react'
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

interface DeployToVercelButtonProps {
  projectId: string
  aiRunId: string
  deploymentUrl?: string | null
}

export function DeployToVercelButton({ projectId, aiRunId, deploymentUrl }: DeployToVercelButtonProps) {
  const router = useRouter()
  const [isDeploying, setIsDeploying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeploy = async () => {
    setIsDeploying(true)
    setError(null)

    try {
      const response = await fetch(`/api/projects/${projectId}/deploy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aiRunId,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to deploy to Vercel')
      }

      const { deploymentUrl: newDeploymentUrl } = await response.json()

      // Refresh to show new deployment URL
      router.refresh()

      // Open deployment in new tab
      if (newDeploymentUrl) {
        window.open(newDeploymentUrl, '_blank')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsDeploying(false)
    }
  }

  // If already deployed, show "View Deployment" button
  if (deploymentUrl) {
    return (
      <a
        href={deploymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
      >
        <Button size="large" variant="outline">
          <ExternalLink className="w-5 h-5 mr-2" />
          View Deployment
        </Button>
      </a>
    )
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="large"
            disabled={isDeploying}
            className="bg-black hover:bg-gray-800 text-white"
          >
            {isDeploying ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 19.7778L12 17L22 19.7778L12 2Z" />
                </svg>
                Deploy to Vercel
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deploy to Vercel?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                This will deploy your project to Vercel's platform. The following will happen:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Your code will be packaged and uploaded to Vercel</li>
                <li>A production-ready deployment will be created</li>
                <li>You'll receive a public URL to share</li>
                <li>Deployments are free on Vercel's hobby tier</li>
              </ul>
              <p className="font-medium">Ready to deploy?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeploy} disabled={isDeploying}>
              {isDeploying ? 'Deploying...' : 'Deploy Now'}
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
