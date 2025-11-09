'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, UserPlus } from 'lucide-react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export function AssignTaskDialog({ taskId, estimatedCost }: { taskId: string; estimatedCost: number }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [executors, setExecutors] = useState<any[]>([])
  const [selectedExecutor, setSelectedExecutor] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch available executors
    // For now, we'll create a dummy executor list
    // In production, you'd fetch from /api/users?role=executor
    setExecutors([
      { id: 'executor-1', name: 'Jane Developer', email: 'jane@example.com' },
      { id: 'executor-2', name: 'John Engineer', email: 'john@example.com' },
    ])
  }, [])

  const handleAssign = async () => {
    if (!selectedExecutor) {
      setError('Please select an executor')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/tasks/${taskId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigneeId: selectedExecutor,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to assign task')
      }

      setOpen(false)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="small" variant="outline">
          <UserPlus className="w-4 h-4 mr-2" />
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Task</DialogTitle>
          <DialogDescription>
            Assign this task to an expert developer. Credits will be reserved when assigned.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="executor">Select Executor</Label>
            <Select value={selectedExecutor} onValueChange={setSelectedExecutor}>
              <SelectTrigger id="executor">
                <SelectValue placeholder="Choose an executor" />
              </SelectTrigger>
              <SelectContent>
                {executors.map((executor) => (
                  <SelectItem key={executor.id} value={executor.id}>
                    {executor.name} ({executor.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-violet-900">Estimated Cost</span>
              <span className="text-lg font-bold text-violet-700">{estimatedCost} credits</span>
            </div>
            <p className="text-xs text-violet-700">
              Credits will be reserved when assigned and deducted when the PR is merged. If the PR is closed without merging, credits will be refunded.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={isLoading || !selectedExecutor}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Assigning...
              </>
            ) : (
              'Assign Task'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
