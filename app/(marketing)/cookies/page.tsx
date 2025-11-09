import PageContainer from '@/components/layout/page-container'

export default function CookiesPage() {
  const seoData = {
    description: 'Cookie Policy for Velocity - Learn about how we use cookies and tracking technologies.',
    keywords: ['cookies', 'tracking', 'analytics', 'privacy', 'data']
  }

  return (
    <PageContainer
      title="Cookie Policy - Velocity"
      seo={seoData}
    >
      <section className="relative bg-body py-20">
        <div className="container px-4 mx-auto max-w-4xl">
          <h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Cookie Policy
          </h1>
          <p className="text-gray-600 mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies for several purposes:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Essential Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Authentication and security</li>
                <li>Session management</li>
                <li>Load balancing</li>
                <li>Essential site features</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Analytics Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Pages visited and time spent on site</li>
                <li>Traffic sources</li>
                <li>User behavior patterns</li>
                <li>Performance metrics</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Functionality Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                These cookies allow the website to remember choices you make and provide enhanced features:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Language preferences</li>
                <li>Region selection</li>
                <li>User interface customization</li>
                <li>Saved preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Advertising Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                These cookies are used to deliver relevant advertisements and track advertising campaign performance:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Ad targeting and personalization</li>
                <li>Campaign effectiveness measurement</li>
                <li>Retargeting</li>
                <li>Interest-based advertising</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use services from trusted third parties that may also set cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>GitHub:</strong> For authentication and repository integration</li>
                <li><strong>Intercom:</strong> For customer support and communication</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">4. Cookie Duration</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cookies can be either:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li><strong>Session cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Cookies that remain on your device for a set period or until you delete them</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">5. Managing Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have several options to manage cookies:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Browser Settings</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>View and delete cookies</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Cookie Preference Center</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can manage your cookie preferences at any time through our Cookie Preference Center. Click the button below to adjust your settings:
              </p>
              <div className="bg-gray-100 rounded-lg p-6 mb-4">
                <button className="bg-gradient-to-br from-purple-800 to-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  Manage Cookie Preferences
                </button>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Please note that blocking or deleting cookies may impact your experience on our website. Some features may not function properly without cookies, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Staying logged in</li>
                <li>Remembering your preferences</li>
                <li>Accessing certain features</li>
                <li>Personalized experience</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">7. Do Not Track</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. We respect DNT signals and will not track users who have DNT enabled.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, our operations, or for other reasons. We will notify you of any material changes by posting the updated policy on this page.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about our use of cookies, please contact us at:
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
