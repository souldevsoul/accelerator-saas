import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import {
  Lightbulb,
  Code2,
  GitPullRequest,
  Eye,
  ListTodo,
  Users,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              How Velocity Works
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From idea to production in four simple steps. No DevOps required.
            </p>
          </div>

          {/* Step-by-Step Process */}
          <div className="space-y-20 mb-20">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">
                    1
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Submit Your Idea
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Describe your MVP in plain English. Tell us what problem you're solving and what features you need. Our AI understands context and requirements.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-violet-600 mr-3 mt-1" />
                    <span className="text-gray-700">Natural language input - no technical jargon required</span>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-violet-600 mr-3 mt-1" />
                    <span className="text-gray-700">Provide examples or reference sites</span>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-violet-600 mr-3 mt-1" />
                    <span className="text-gray-700">Connect your GitHub repository</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-8 h-80 flex items-center justify-center">
                <Code2 className="w-32 h-32 text-violet-600" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 h-80 flex items-center justify-center">
                <Zap className="w-32 h-32 text-blue-600" />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">
                    2
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    AI Generates Your MVP
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Our AI analyzes your requirements and generates production-ready code. You'll get a complete React app with modern best practices, deployed and ready to preview.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <GitPullRequest className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <span className="text-gray-700">Creates a new GitHub branch and pull request</span>
                  </li>
                  <li className="flex items-start">
                    <GitPullRequest className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <span className="text-gray-700">Automatic deployment to preview environment</span>
                  </li>
                  <li className="flex items-start">
                    <GitPullRequest className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <span className="text-gray-700">100 credits debited from your wallet</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">
                    3
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Review & Add Features
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Review your MVP in the live preview. Create tasks for additional features, bug fixes, or content updates. Choose between AI execution or expert developers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Eye className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <span className="text-gray-700">View live preview of your MVP</span>
                  </li>
                  <li className="flex items-start">
                    <ListTodo className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <span className="text-gray-700">Create and prioritize tasks</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    <span className="text-gray-700">Assign to AI or human experts</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 h-80 flex items-center justify-center">
                <ListTodo className="w-32 h-32 text-green-600" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 h-80 flex items-center justify-center">
                <Check className="w-32 h-32 text-orange-600" />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">
                    4
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Approve & Deploy
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Review pull requests, approve changes, and merge to production. Deploy to your favorite platform with one click. Your MVP is ready to show the world.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-orange-600 mr-3 mt-1" />
                    <span className="text-gray-700">Review code and changes in GitHub</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-orange-600 mr-3 mt-1" />
                    <span className="text-gray-700">Merge when ready - credits only charged on completion</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-orange-600 mr-3 mt-1" />
                    <span className="text-gray-700">Deploy to Vercel, Netlify, or your platform</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="bg-gray-50 rounded-2xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why teams choose Velocity
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ship 10x Faster
                </h3>
                <p className="text-gray-600">
                  From idea to production in hours, not months. Perfect for validating concepts quickly.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Expert Quality
                </h3>
                <p className="text-gray-600">
                  Our network of vetted developers ensures production-ready code that scales.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Full Control
                </h3>
                <p className="text-gray-600">
                  Your code, your repo, your deployment. Review everything before it goes live.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to build your MVP?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of founders shipping faster
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="large" className="text-lg px-8 h-14 flex items-center">
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="large" variant="outline" className="text-lg px-8 h-14">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
