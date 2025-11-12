import PageContainer from '@/components/layout/page-container'

export default function AcceptableUsePage() {
  const seoData = {
    description: 'Acceptable Use Policy for Nimbus - Learn about the rules and guidelines for using our platform.',
    keywords: ['acceptable use', 'terms', 'rules', 'guidelines', 'policy']
  }

  return (
    <PageContainer
      title="Acceptable Use Policy - Nimbus"
      seo={seoData}
    >
      <section className="relative bg-body py-20">
        <div className="container px-4 mx-auto max-w-4xl">
          <h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Acceptable Use Policy
          </h1>
          <p className="text-gray-600 mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                This Acceptable Use Policy describes prohibited uses of Nimbus's services. If you violate this policy, we may suspend or terminate your access to our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">2. Prohibited Activities</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may not use our services to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malware, viruses, or other malicious code</li>
                <li>Engage in spamming or phishing activities</li>
                <li>Harass, abuse, or harm others</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Scrape or data mine without permission</li>
                <li>Use automated systems to access the service excessively</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">3. Content Guidelines</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When using our AI generation services, you may not create content that:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Is illegal, harmful, or promotes illegal activities</li>
                <li>Contains explicit or adult content</li>
                <li>Promotes violence, terrorism, or hate speech</li>
                <li>Violates privacy rights of others</li>
                <li>Contains misleading or deceptive information</li>
                <li>Infringes on copyrights or trademarks</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">4. Account Responsibilities</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring compliance with this policy by any users you add to your account</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">5. API Usage</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When using our API, you must:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Respect rate limits and usage quotas</li>
                <li>Use API keys securely and not share them publicly</li>
                <li>Implement appropriate error handling</li>
                <li>Cache responses when appropriate to reduce unnecessary calls</li>
                <li>Comply with all API documentation and guidelines</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">6. Generated Code</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Code generated through our platform:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Must be reviewed before deployment to production</li>
                <li>Should comply with applicable security standards</li>
                <li>Must not be used to create harmful or malicious applications</li>
                <li>Should respect third-party licenses and dependencies</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">7. Enforcement</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Investigate potential violations of this policy</li>
                <li>Remove content that violates this policy</li>
                <li>Suspend or terminate accounts for policy violations</li>
                <li>Report illegal activities to law enforcement</li>
                <li>Take legal action if necessary</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">8. Reporting Violations</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you become aware of any violations of this policy, please report them to:
              </p>
              <p className="text-gray-600 leading-relaxed">
                Email: support@nimbusdev.com
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may update this Acceptable Use Policy from time to time. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
