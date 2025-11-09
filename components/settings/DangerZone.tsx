'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Loader2, AlertTriangle } from 'lucide-react'

export function DangerZone({ userId }: { userId: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm')
      return
    }

    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete account')
      }

      // Sign out and redirect to home
      router.push('/')
    } catch (err: any) {
      setError(err.message)
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-red-900">Delete Account</p>
          <p className="text-sm text-red-700 mt-1">
            Once you delete your account, there is no going back. This action is permanent and cannot be undone.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm text-gray-700">
          <p className="font-medium mb-2">The following will be permanently deleted:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>All your projects and tasks</li>
            <li>Your credit balance and transaction history</li>
            <li>All notification preferences and settings</li>
            <li>Your account and profile information</li>
          </ul>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Account'
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>
                  This action cannot be undone. This will permanently delete your account and remove all your data
                  from our servers.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="confirm-delete">
                    Type <span className="font-bold">DELETE</span> to confirm
                  </Label>
                  <Input
                    id="confirm-delete"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="DELETE"
                  />
                </div>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting || confirmText !== 'DELETE'}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
