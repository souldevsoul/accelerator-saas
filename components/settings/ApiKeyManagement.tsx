'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApiKey } from 'db'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Loader2, Plus, Copy, Trash2, Key, Check } from 'lucide-react'

export function ApiKeyManagement({ apiKeys }: { apiKeys: ApiKey[] }) {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      setError('Please enter a name for the API key')
      return
    }

    setIsCreating(true)
    setError(null)

    try {
      const response = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newKeyName }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create API key')
      }

      const data = await response.json()
      setGeneratedKey(data.key)
      setNewKeyName('')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteKey = async (keyId: string) => {
    setIsDeleting(keyId)

    try {
      const response = await fetch(`/api/user/api-keys/${keyId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete API key')
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsDeleting(null)
    }
  }

  const copyToClipboard = async (text: string, keyId: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const maskKey = (key: string) => {
    if (key.length <= 8) return key
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Key className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-blue-900">API Keys</p>
          <p className="text-sm text-blue-700 mt-1">
            API keys allow you to authenticate requests to the API. Keep your keys secure and never share them publicly.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {apiKeys.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <Key className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 mb-2">No API keys yet</p>
            <p className="text-sm text-gray-500">Create your first API key to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">{apiKey.name}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono text-xs">
                      {maskKey(apiKey.key)}
                    </code>
                    <span>Created {formatDate(apiKey.createdAt)}</span>
                    {apiKey.lastUsedAt && (
                      <span>Last used {formatDate(apiKey.lastUsedAt)}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                  >
                    {copiedKey === apiKey.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="small"
                        disabled={isDeleting === apiKey.id}
                      >
                        {isDeleting === apiKey.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-600" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete API Key?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. Applications using this key will no longer be able to access the API.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteKey(apiKey.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create New API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                {generatedKey
                  ? 'Your API key has been created. Make sure to copy it now as you won\'t be able to see it again.'
                  : 'Create a new API key to access the API.'}
              </DialogDescription>
            </DialogHeader>

            {generatedKey ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-2">API Key Created Successfully!</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-white border border-green-300 rounded font-mono text-xs break-all">
                      {generatedKey}
                    </code>
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => copyToClipboard(generatedKey, 'generated')}
                    >
                      {copiedKey === 'generated' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setGeneratedKey(null)
                    setIsDialogOpen(false)
                  }}
                  className="w-full"
                >
                  Done
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input
                      id="keyName"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production API, Mobile App"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      A descriptive name to help you identify this key
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      setNewKeyName('')
                      setError(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateKey} disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Key'
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
