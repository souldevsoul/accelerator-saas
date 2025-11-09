'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Check, Sparkles } from 'lucide-react'

const PACKAGES = [
  {
    id: '100',
    credits: 100,
    price: 9.99,
    popular: false,
    features: ['Perfect for trying out the platform', '1 MVP generation', 'Or ~3 medium tasks'],
  },
  {
    id: '1000',
    credits: 1000,
    price: 79.99,
    popular: true,
    savings: 20,
    features: ['Best value for regular users', '10 MVP generations', 'Or ~33 medium tasks', '20% savings'],
  },
  {
    id: '10000',
    credits: 10000,
    price: 599.99,
    popular: false,
    savings: 40,
    features: ['For power users and agencies', '100 MVP generations', 'Or ~333 medium tasks', '40% savings'],
  },
]

export function CreditPackages({ userId }: { userId: string }) {
  const [loadingPackage, setLoadingPackage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async (packageId: string) => {
    setLoadingPackage(packageId)
    setError(null)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          userId,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (err: any) {
      setError(err.message)
      setLoadingPackage(null)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg ${
              pkg.popular ? 'border-violet-600 shadow-md' : 'border-gray-200'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="inline-block bg-violet-100 text-violet-700 px-4 py-2 rounded-xl font-bold text-lg mb-3">
                {pkg.credits.toLocaleString()} Credits
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
              </div>
              {pkg.savings && (
                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Save {pkg.savings}%
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handlePurchase(pkg.id)}
              disabled={loadingPackage !== null}
              className={`w-full ${
                pkg.popular
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700'
                  : ''
              }`}
              variant={pkg.popular ? 'primary' : 'outline'}
              size="large"
            >
              {loadingPackage === pkg.id ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Purchase'
              )}
            </Button>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}
