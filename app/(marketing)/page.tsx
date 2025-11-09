import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, Users, GitBranch, Eye, Check, ArrowRight, Code, Rocket, Shield, Clock, Star, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const seoData = {
    description: 'Velocity helps teams build and ship MVPs faster with AI-powered code generation, expert developers, and seamless workflows.',
    keywords: ['MVP development', 'AI code generation', 'rapid prototyping', 'developer platform', 'startup tools']
  };

  return (
    <PageContainer
      title="Velocity - Build Your MVP in Minutes"
      seo={seoData}
    >
      {/* Hero Section */}
      <section className="relative bg-body overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-transparent opacity-60"></div>

        <div className="container px-4 mx-auto py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-teal-200 rounded-full mb-8 shadow-sm">
              <Star className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ developers worldwide</span>
            </div>

            <h1 className="font-heading tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
              Build and ship your <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">MVP in minutes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              From effortless AI code generation to expert developers, take control of your product with precision and speed. No coding required.
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

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>100 free credits</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container px-4 mx-auto pb-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=800&fit=crop"
                alt="Dashboard preview showing AI-powered MVP generation"
                className="w-full"
              />
              {/* Floating Stats */}
              <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-4 backdrop-blur-sm bg-opacity-95">
                <div className="text-2xl font-bold text-teal-600">3 min</div>
                <div className="text-xs text-gray-600">Avg. generation time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-teal-700 to-cyan-700 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-teal-100">Projects Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-teal-100">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">3min</div>
              <div className="text-teal-100">Avg. Build Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-teal-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="uppercase text-teal-600 text-sm font-semibold tracking-wider mb-4">FEATURES</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to ship fast
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools and integrations you need to build, test, and deploy production-ready applications.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">AI MVP Generation</h3>
              <p className="text-gray-600 mb-6">
                Get production-ready code in minutes with AI-powered generation. Best practices built-in for full stack applications.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Production-ready in 3 minutes</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Modern tech stack (Next.js, React)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Database & Auth included</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-700 to-teal-900 rounded-lg flex items-center justify-center mb-6">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">Clean, Modern Code</h3>
              <p className="text-gray-600 mb-6">
                Get maintainable, well-structured code following industry best practices and modern frameworks.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">TypeScript by default</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Component-based architecture</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Easy to customize</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
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
                  <p className="text-sm text-gray-700">Auto repository creation</p>
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
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
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
                  <p className="text-sm text-gray-700">Live preview URLs</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Share with stakeholders</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Mobile responsive</p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-purple-900 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 mb-6">
                Built-in security best practices, authentication, and data protection for your applications.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">NextAuth integration</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">SOC 2 compliant</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Encrypted data storage</p>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-700 to-pink-900 rounded-lg flex items-center justify-center mb-6">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">One-Click Deploy</h3>
              <p className="text-gray-600 mb-6">
                Deploy to Vercel, Netlify, or your preferred hosting platform with a single click.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Vercel integration</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Auto SSL certificates</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Global CDN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="uppercase text-teal-600 text-sm font-semibold tracking-wider mb-4">HOW IT WORKS</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ship your MVP in 3 simple steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From idea to deployed application in minutes, not months.
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-800 to-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Describe Your Idea</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply describe what you want to build in plain English. Our AI understands your requirements and creates a detailed specification.
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Generates Your App</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch as our AI builds your complete MVP with working features, beautiful UI, and production-ready code in minutes.
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-yellowGreen-700 to-yellowGreen-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deploy & Iterate</h3>
              <p className="text-gray-600 leading-relaxed">
                Review your app, make changes, and deploy to production with one click. Keep iterating as your business grows.
              </p>
            </div>
          </div>

          {/* Video/Demo CTA */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <Link href="/login">
              <Button
                variant="primary"
                size="large"
                icon={<Rocket className="w-5 h-5" />}
                iconPosition="left"
              >
                Start Building Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="uppercase text-teal-600 text-sm font-semibold tracking-wider mb-4">TESTIMONIALS</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by developers worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of founders and developers who are building faster with Velocity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "We went from idea to a working prototype in under 2 hours. This is a game-changer for founders who want to move fast."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <div className="font-semibold text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-600">Founder, TechStartup</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "The code quality is exceptional. Clean, modern, and follows best practices. Our team was impressed."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Miller</div>
                  <div className="text-sm text-gray-600">CTO, SaaS Co</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Saved us months of development time and thousands in costs. The perfect tool for validating ideas quickly."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                  MJ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Johnson</div>
                  <div className="text-sm text-gray-600">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <p className="uppercase text-teal-600 text-sm font-semibold tracking-wider mb-4">FAQ</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-6">
            {/* FAQ Item */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to generate an MVP?</h3>
              <p className="text-gray-600">Most MVPs are generated in 2-5 minutes. More complex applications may take up to 10 minutes.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What tech stack do you use?</h3>
              <p className="text-gray-600">We use modern, production-ready technologies including Next.js, React, TypeScript, Tailwind CSS, and PostgreSQL.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I customize the generated code?</h3>
              <p className="text-gray-600">Absolutely! You own 100% of the code. Download it, customize it, and deploy it anywhere you want.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need coding knowledge?</h3>
              <p className="text-gray-600">No coding knowledge required to generate your MVP. However, some technical knowledge is helpful for customization.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What's included in the free tier?</h3>
              <p className="text-gray-600">You get 100 free credits to start, which is enough to generate 1-2 complete MVPs and test all features.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-800 via-teal-700 to-purple-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="relative z-10">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to build your MVP?
              </h2>
              <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
                Join 10,000+ developers and founders who are shipping faster with Velocity. Get started in minutes, no credit card required.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/login">
                  <Button
                    variant="secondary"
                    size="large"
                    icon={<Rocket className="w-5 h-5" />}
                    iconPosition="left"
                  >
                    Start Building Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="large"
                    className="bg-white bg-opacity-20 text-white border-white border hover:bg-opacity-30"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white text-opacity-80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">10K+ Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
