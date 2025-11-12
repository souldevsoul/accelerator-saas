import Link from 'next/link'
import PageContainer from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'
import { Users, Code, Clock, CheckCircle2 } from 'lucide-react'
import { AnimatedBackground } from '@/components/marketing/AnimatedBackground'

export default function ExpertsPage() {
  const seoData = {
    description: 'Get expert help for your development projects. Our vetted developers can tackle complex tasks and custom requirements.',
    keywords: ['expert developers', 'custom development', 'professional help', 'development services']
  }

  return (
    <PageContainer
      title="Expert Developers - Nimbus"
      seo={seoData}
    >
      {/* Hero */}
      <section className="relative bg-body">
        <AnimatedBackground />
        <div className="container px-4 mx-auto py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
              Expert Developers
            </h1>
            <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
              Need help with complex tasks or custom requirements? Our vetted expert developers can help.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto mb-12">
              <p className="text-lg text-gray-900 font-semibold">
                Expert developer feature coming soon.
              </p>
              <p className="text-gray-700 mt-2">
                For now, all tasks are handled by our AI system. Expert assignment will be available in a future update.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Vetted Experts
              </h3>
              <p className="text-gray-700">
                All developers are carefully screened and verified
              </p>
            </div>

            <div className="text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Complex Tasks
              </h3>
              <p className="text-gray-700">
                Handle advanced features and custom requirements
              </p>
            </div>

            <div className="text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Flexible Timing
              </h3>
              <p className="text-gray-700">
                Experts work on your schedule and timeline
              </p>
            </div>

            <div className="text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quality Guarantee
              </h3>
              <p className="text-gray-700">
                Credits refunded if work doesn't meet standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
              Get notified when experts launch
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
              Sign up now to be first in line when we launch our expert developer marketplace.
            </p>
            <Link href="/login">
              <Button
                type="button"
                variant="secondary"
                size="large"
              >
                Join Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
