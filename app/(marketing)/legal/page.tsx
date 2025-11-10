import Link from 'next/link'
import PageContainer from '@/components/layout/page-container'
import { FileText, Shield, Cookie, Scale } from 'lucide-react'

export default function LegalPage() {
  const seoData = {
    description: 'Legal information and policies for Nimbus - Terms, Privacy, and Compliance.',
    keywords: ['legal', 'compliance', 'policies', 'terms', 'privacy']
  }

  return (
    <PageContainer
      title="Legal - Nimbus"
      seo={seoData}
    >
      <section className="relative bg-body py-20">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              Legal Information
            </h1>
            <p className="text-xl text-gray-600">
              Transparency and compliance are core to our values. Find all our legal policies and information here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: FileText,
                title: 'Terms of Service',
                description: 'Our terms and conditions for using the Nimbus platform.',
                link: '/terms'
              },
              {
                icon: Shield,
                title: 'Privacy Policy',
                description: 'How we collect, use, and protect your personal information.',
                link: '/privacy'
              },
              {
                icon: Cookie,
                title: 'Cookie Policy',
                description: 'Information about cookies and tracking technologies we use.',
                link: '/cookies'
              },
              {
                icon: Scale,
                title: 'Acceptable Use Policy',
                description: 'Guidelines for appropriate use of our platform and services.',
                link: '/acceptable-use'
              }
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sky-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="bg-gray-50 rounded-3xl p-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6 text-center">
              Compliance & Certifications
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="font-semibold text-gray-900 mb-2">GDPR Compliant</h4>
                <p className="text-gray-600 text-sm">
                  Full compliance with EU data protection regulations
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h4 className="font-semibold text-gray-900 mb-2">SOC 2 Type II</h4>
                <p className="text-gray-600 text-sm">
                  Certified security and availability controls
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✓</div>
                <h4 className="font-semibold text-gray-900 mb-2">ISO 27001</h4>
                <p className="text-gray-600 text-sm">
                  Information security management certification
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
              Contact Legal Team
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              For legal inquiries, compliance questions, or to report legal concerns, please contact our legal team:
            </p>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="space-y-4 text-gray-600">
                <div>
                  <strong className="text-gray-900">Email:</strong>{' '}
                  <a href="mailto:legal@nimbusdev.com" className="text-sky-600 hover:underline">
                    legal@nimbusdev.com
                  </a>
                </div>
                <div>
                  <strong className="text-gray-900">Data Protection Officer:</strong>{' '}
                  <a href="mailto:dpo@nimbusdev.com" className="text-sky-600 hover:underline">
                    dpo@nimbusdev.com
                  </a>
                </div>
                <div>
                  <strong className="text-gray-900">Security Issues:</strong>{' '}
                  <a href="mailto:security@nimbusdev.com" className="text-sky-600 hover:underline">
                    security@nimbusdev.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
