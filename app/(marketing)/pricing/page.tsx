import Link from 'next/link'
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react'

export default function PricingPage() {
  const seoData = {
    description: 'Simple, transparent pricing for Velocity. Pay only for what you use with our credit-based system.',
    keywords: ['pricing', 'credits', 'plans', 'MVP development', 'cost']
  };

  return (
    <PageContainer
      title="Pricing - Velocity"
      seo={seoData}
    >
      <section className="relative bg-body">

        {/* Hero */}
        <div className="container px-4 mx-auto py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Pay only for what you use. No subscriptions, no hidden fees. Buy credits and use them whenever you need.
            </p>
          </div>
        </div>

        {/* Credit Packages */}
        <div className="container px-4 mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                credits: 100,
                price: 9.99,
                popular: false,
                features: ['1 MVP generation', '3-6 small tasks', 'GitHub integration', 'Live previews']
              },
              {
                credits: 1000,
                price: 79.99,
                popular: true,
                features: ['10 MVP generations', '30-60 tasks', 'Priority support', 'Expert developers']
              },
              {
                credits: 10000,
                price: 599.99,
                popular: false,
                features: ['100 MVP generations', '300+ tasks', 'Dedicated support', 'Custom workflows']
              }
            ].map((pkg, index) => (
              <div key={index} className="relative">
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-purple-800 to-purple-900 rounded-full shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-white uppercase text-xs font-semibold">RECOMMENDED</span>
                    </div>
                  </div>
                )}
                <div className={`rounded-2xl border ${pkg.popular ? 'border-purple-600 shadow-2xl scale-105' : 'border-gray-200 shadow-lg'} bg-white p-8 h-full flex flex-col`}>
                  <div className="flex-1">
                    <div className="text-4xl font-bold mb-2 text-gray-900">
                      {pkg.credits.toLocaleString()}
                    </div>
                    <div className="text-sm mb-6 text-gray-500">
                      credits
                    </div>
                    <div className="text-5xl font-bold mb-2 text-gray-900">
                      ${pkg.price}
                    </div>
                    <div className="text-sm mb-8 text-gray-500">
                      ${(pkg.price / pkg.credits).toFixed(2)} per credit
                    </div>
                    <Link href="/login">
                      <Button
                        variant={pkg.popular ? "primary" : "outline"}
                        fullWidth
                        className="mb-8"
                      >
                        Get started
                      </Button>
                    </Link>
                    <div className="w-full h-px bg-gray-200 mb-8"></div>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-green-600" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Credits Work */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            How credits work
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* MVP Generation */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                AI MVP Generation
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-gray-600">Full MVP with working code</span>
                  <span className="font-bold text-gray-900 text-lg">100 credits</span>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-700 to-teal-900 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Task Development
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Small bug fix</span>
                  <span className="font-bold text-gray-900">15 credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Medium feature</span>
                  <span className="font-bold text-gray-900">60 credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Large feature</span>
                  <span className="font-bold text-gray-900">90 credits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formula */}
          <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Formula:</h4>
            <p className="text-gray-600 mb-8 text-lg">
              Task Cost = Base Cost × Complexity Multiplier
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="font-semibold text-gray-900 text-lg block mb-4">Base Costs:</span>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Feature: 30 credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Bug: 15 credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Content: 10 credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Other: 20 credits
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-gray-900 text-lg block mb-4">Complexity:</span>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Small (S): 1×
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Medium (M): 2×
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Large (L): 3×
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Frequently asked questions
          </h2>
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do credits expire?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No! Your credits never expire. Buy once and use them whenever you need.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What happens if a task fails?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                If a PR is closed without merging, credits are automatically refunded to your wallet.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I get a refund?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! We offer a 30-day money-back guarantee on all credit purchases.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! Every new account gets 100 free credits to try the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-800 to-purple-900 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to get started?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
              Sign up now and get 100 free credits to try the platform.
            </p>
            <Link href="/login">
              <Button
                variant="secondary"
                size="large"
              >
                Start Building
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
