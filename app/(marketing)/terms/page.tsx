import PageContainer from '@/components/layout/page-container'

export default function TermsPage() {
  const seoData = {
    description: 'Terms of Service for Velocity - Read our terms and conditions for using the platform.',
    keywords: ['terms', 'terms of service', 'legal', 'conditions', 'agreement']
  }

  return (
    <PageContainer
      title="Terms of Service - Velocity"
      seo={seoData}
    >
      <section className="relative bg-body py-20">
        <div className="container px-4 mx-auto max-w-4xl">
          <h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing and using Velocity ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Velocity provides an AI-powered platform for software development, including but not limited to MVP generation, task-based development, and code generation services. The Service is provided "as is" and "as available" without any warranties.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To use certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your password and account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">4. Credits and Payment</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our Service operates on a credit-based system:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Credits are purchased packages and do not expire</li>
                <li>Credits are non-refundable except as required by law or as specified in our refund policy</li>
                <li>Pricing is subject to change with 30 days notice</li>
                <li>All payments are processed securely through our payment provider</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Violate any laws or regulations</li>
                <li>Generate malicious code or content</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for competitive purposes</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by Velocity and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Code generated through the Service is owned by you, subject to our license terms for the underlying AI technology.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To the maximum extent permitted by law, Velocity shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We reserve the right to terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-600 leading-relaxed">
                Email: legal@velocitydev.com
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
