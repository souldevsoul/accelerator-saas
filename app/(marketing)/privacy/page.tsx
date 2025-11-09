import PageContainer from '@/components/layout/page-container'

export default function PrivacyPage() {
  const seoData = {
    description: 'Privacy Policy for Velocity - Learn how we collect, use, and protect your data.',
    keywords: ['privacy', 'privacy policy', 'data protection', 'GDPR', 'security']
  }

  return (
    <PageContainer
      title="Privacy Policy - Velocity"
      seo={seoData}
    >
      <section className="relative bg-body py-20">
        <div className="container px-4 mx-auto max-w-4xl">
          <h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Velocity, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely through our payment provider)</li>
                <li>Profile information</li>
                <li>Communications with us</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Usage Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We automatically collect certain information about your use of the Service:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (features used, time spent, interactions)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Code and Project Data</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you use our Service to generate or modify code:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Project descriptions and requirements</li>
                <li>Generated code and configurations</li>
                <li>Task descriptions and history</li>
                <li>Connected repository information (via GitHub integration)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process transactions and manage your account</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new features and services</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly consent to sharing</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Encryption in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure infrastructure and monitoring</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We retain your information for as long as necessary to provide the Service and fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or legitimate business purposes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Access and receive a copy of your data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                To exercise these rights, please contact us at privacy@velocitydev.com
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar technologies to collect usage information and improve your experience. You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p className="text-gray-600 leading-relaxed">
                Email: privacy@velocitydev.com
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
