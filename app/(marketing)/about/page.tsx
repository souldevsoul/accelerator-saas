import Link from 'next/link'
import PageContainer from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'
import { Users, Target, Zap, Heart } from 'lucide-react'
import { AnimatedBackground } from '@/components/marketing/AnimatedBackground'

export default function AboutPage() {
  const seoData = {
    description: 'Learn about Nimbus - the AI-powered platform that helps developers build MVPs and ship features faster.',
    keywords: ['about', 'company', 'mission', 'team', 'AI development', 'MVP builder']
  }

  return (
    <PageContainer
      title="About Us - Nimbus"
      seo={seoData}
    >
      {/* Hero */}
      <section className="relative bg-body">
        <AnimatedBackground />
        <div className="container px-4 mx-auto py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
              Building the future of software development
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
              We're on a mission to empower developers to ship faster by automating the tedious parts of software development.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Nimbus helps developers ship faster by automating repetitive development tasks. Built by experienced developers who understand the pain of rebuilding authentication, databases, and deployment pipelines for every project.
                </p>
                <p>
                  We've been there - setting up the same boilerplate code, configuring the same tools, solving the same problems over and over. That's why we built Nimbus.
                </p>
                <p>
                  Our platform handles the repetitive work so you can focus on what makes your product unique.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Speed',
                description: 'We believe in shipping fast and iterating quickly to deliver value to users.'
              },
              {
                icon: Users,
                title: 'Developer-First',
                description: 'Every decision we make is centered around making developers more productive.'
              },
              {
                icon: Target,
                title: 'Quality',
                description: 'We maintain high standards for code quality, security, and best practices.'
              },
              {
                icon: Heart,
                title: 'Transparency',
                description: 'We believe in honest communication and clear pricing with no hidden fees.'
              }
            ].map((value, index) => (
              <div key={index} className="text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { number: '100+', label: 'Projects Created' },
              { number: '1,000+', label: 'Tasks Completed' }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
                  {stat.number}
                </div>
                <div className="text-xl text-gray-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
              Join us on our mission
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
              Be part of the future of software development. Start building with Nimbus today.
            </p>
            <Link href="/login">
              <Button
                variant="secondary"
                size="large"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
