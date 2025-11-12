'use client'

import PageContainer from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'
import { Mail, MessageSquare, HelpCircle, Building2 } from 'lucide-react'
import { AnimatedBackground } from '@/components/marketing/AnimatedBackground'

export default function ContactPage() {
  const seoData = {
    description: 'Get in touch with the Nimbus team. We\'re here to help with any questions about our platform.',
    keywords: ['contact', 'support', 'help', 'sales', 'customer service']
  }

  return (
    <PageContainer
      title="Contact Us - Nimbus"
      seo={seoData}
    >
      {/* Hero */}
      <section className="relative bg-body">
        <AnimatedBackground />
        <div className="container px-4 mx-auto py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
              Get in touch
            </h1>
            <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
            <div className="bg-sky-50 border border-yellow-200 rounded-xl p-4 max-w-2xl mx-auto mb-12">
              <p className="text-gray-900 font-semibold">
                Form submissions are currently in development.
              </p>
              <p className="text-gray-700 mt-1">
                Please email us directly at <a href="mailto:support@nimbusdev.com" className="text-blue-600 hover:underline">support@nimbusdev.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                description: 'support@nimbusdev.com',
                action: 'mailto:support@nimbusdev.com'
              },
              {
                icon: MessageSquare,
                title: 'Live Chat',
                description: 'Chat with our team',
                action: '#'
              },
              {
                icon: HelpCircle,
                title: 'Help Center',
                description: 'Browse our docs',
                action: '#'
              },
              {
                icon: Building2,
                title: 'Enterprise',
                description: 'enterprise@nimbusdev.com',
                action: 'mailto:enterprise@nimbusdev.com'
              }
            ].map((option, index) => (
              <a
                key={index}
                href={option.action}
                className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8 shadow-lg hover:shadow-xl transition-shadow text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-700">
                  {option.description}
                </p>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8 md:p-12 shadow-lg">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Send us a message
              </h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="Your name"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="your@email.com"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                    placeholder="How can we help?"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us more about your inquiry..."
                    disabled
                  ></textarea>
                </div>
                <div className="text-center">
                  <Button
                    variant="primary"
                    size="large"
                    className="w-full md:w-auto"
                    disabled
                  >
                    Send Message (Coming Soon)
                  </Button>
                  <p className="text-sm text-gray-600 mt-4">
                    This is an MVP stage feature. Please use email for now.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Looking for quick answers?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Check out our FAQ section or documentation for instant answers to common questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="large">
              View FAQ
            </Button>
            <Button variant="outline" size="large">
              Read Docs
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
