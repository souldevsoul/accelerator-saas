import Link from 'next/link'
import PageContainer from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, Wrench } from 'lucide-react'
import { AnimatedBackground } from '@/components/marketing/AnimatedBackground'

export default function BlogPage() {
  const seoData = {
    description: 'Read the latest from Nimbus - tips, tutorials, and insights on AI-powered development.',
    keywords: ['blog', 'articles', 'tutorials', 'AI development', 'MVP', 'software development']
  }

  return (
    <PageContainer
      title="Blog - Nimbus"
      seo={seoData}
    >
      {/* Hero */}
      <section className="relative bg-body">
        <AnimatedBackground />
        <div className="container px-4 mx-auto py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
              Blog & Resources
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
              Valuable content and resources coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-12 md:p-16 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Coming Soon
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We're working on valuable content for you. In the meantime, check out our documentation and tutorials to get the most out of Nimbus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/how-it-works">
                  <Button variant="primary" size="large">
                    How It Works
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="large">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Resources Preview */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: FileText,
                title: 'Tutorials',
                description: 'Step-by-step guides to help you build faster'
              },
              {
                icon: BookOpen,
                title: 'Best Practices',
                description: 'Learn from experienced developers'
              },
              {
                icon: Wrench,
                title: 'Technical Insights',
                description: 'Deep dives into how Nimbus works'
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-700">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Stay updated
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
              Get notified when we publish new articles, tutorials, and product updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-3 rounded-lg outline-none"
                disabled
              />
              <Button variant="secondary" size="large" disabled>
                Coming Soon
              </Button>
            </div>
            <p className="text-sm text-white text-opacity-70 mt-4">
              Newsletter signup launching soon
            </p>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
