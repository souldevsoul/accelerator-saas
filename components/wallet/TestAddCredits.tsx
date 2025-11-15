'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, TestTube } from 'lucide-react'

export function TestAddCredits() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  const handleTestAddCredits = async (credits: number) => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/test/add-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add credits')
      }

      setMessage({
        type: 'success',
        text: `Successfully added ${credits} credits! New balance: ${data.balance}`,
      })

      // Refresh the page to show updated balance
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Failed to add credits',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <TestTube className="w-5 h-5 text-yellow-700" />
        <h3 className="font-semibold text-yellow-900">Development Test Tools</h3>
      </div>
      <p className="text-sm text-yellow-800 mb-3">
        Test credit addition without Stripe payment (development only)
      </p>
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => handleTestAddCredits(100)}
          disabled={loading}
          variant="outline"
          size="small"
          className="bg-white"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            '+'
          )}
          Add 100 Credits
        </Button>
        <Button
          onClick={() => handleTestAddCredits(1000)}
          disabled={loading}
          variant="outline"
          size="small"
          className="bg-white"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            '+'
          )}
          Add 1000 Credits
        </Button>
        <Button
          onClick={() => handleTestAddCredits(10000)}
          disabled={loading}
          variant="outline"
          size="small"
          className="bg-white"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            '+'
          )}
          Add 10000 Credits
        </Button>
      </div>
      {message && (
        <div
          className={`mt-3 p-2 rounded text-sm ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}
