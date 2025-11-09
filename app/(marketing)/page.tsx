import PageContainer from '@/components/layout/page-container';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Zap, Users, GitBranch, Eye, Check, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const seoData = {
    description: 'Accelerator helps teams build and ship MVPs faster with AI-powered code generation, expert developers, and seamless workflows.',
    keywords: ['MVP development', 'AI code generation', 'rapid prototyping', 'developer platform', 'startup tools']
  };

  return (
    <PageContainer
      title="Accelerator - Build Your MVP in Minutes"
      seo={seoData}
    >
      {/* Hero Section */}
      <section className="relative bg-body">
        <div className="container px-4 mx-auto py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
              Simplifying MVP development for modern founders
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              From effortless AI code generation to expert developers, take control of your product with precision and speed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login">
                <Button
                  variant="primary"
                  size="large"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Get started for free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="secondary"
                  size="large"
                >
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container px-4 mx-auto pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=800&fit=crop"
                alt="Dashboard preview"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="uppercase text-teal-600 text-sm font-semibold tracking-wider mb-4">FEATURES</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to ship fast
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides intuitive development solutions, allowing you to focus on growing your business.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">AI MVP Generation</h3>
              <p className="text-gray-600 mb-6">
                Get production-ready code in minutes with AI-powered generation. Best practices built-in for full stack applications.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Production-ready code in minutes</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Best practices built-in</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Full stack applications</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-700 to-teal-900 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">Expert Developers</h3>
              <p className="text-gray-600 mb-6">
                Access experienced developers who understand your vision and can bring it to life with quality code.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Vetted professionals</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Fast turnaround</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Quality guaranteed</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-yellowGreen-700 to-yellowGreen-900 rounded-lg flex items-center justify-center mb-6">
                <GitBranch className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">GitHub Integration</h3>
              <p className="text-gray-600 mb-6">
                Seamless integration with GitHub for version control, collaboration, and deployment workflows.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">One-click deployment</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">PR automation</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Code review tools</p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-700 to-cyan-900 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">Instant Previews</h3>
              <p className="text-gray-600 mb-6">
                See your changes live in real-time with instant preview deployments for every code change.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Live previews</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Share with team</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Mobile responsive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            How it works
          </h2>

          {/* Steps */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Submit Your Idea</h3>
              <p className="text-gray-600">
                Describe your MVP in plain English. Our AI understands what you want to build.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Generates Code</h3>
              <p className="text-gray-600">
                Get a complete MVP with working features, deployed and ready to preview in minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellowGreen-700 to-yellowGreen-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ship to Production</h3>
              <p className="text-gray-600">
                Review, approve, and merge. Deploy to your favorite platform in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to build your MVP in minutes?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
              Join thousands of founders who are shipping faster with Accelerator.
            </p>
            <Link href="/login">
              <Button
                variant="secondary"
                size="large"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
