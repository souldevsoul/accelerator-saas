import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageContainer from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { AnimatedBackground } from '@/components/marketing/AnimatedBackground'

// This would normally come from a CMS or database
const blogPosts = {
  'how-replit-uses-firecrawl-to-power-ai-agents': {
    title: 'How Replit Uses Web Scraping to Power AI Agents',
    date: 'January 15, 2025',
    readTime: '5 min read',
    author: 'Nimbus Team',
    content: `
      <p>This is a placeholder article about web scraping and AI agents. The full content will be added soon.</p>

      <h2>Introduction</h2>
      <p>AI agents are becoming increasingly sophisticated, and web scraping plays a crucial role in providing them with real-time data and context.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li>Web scraping enables AI agents to access up-to-date information</li>
        <li>Structured data extraction improves AI agent performance</li>
        <li>Nimbus makes it easy to integrate web scraping into your applications</li>
      </ul>
    `
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  const seoData = {
    description: `${post.title} - Read about the latest insights and best practices.`,
    keywords: ['blog', 'article', 'development', 'AI', 'web scraping']
  }

  return (
    <PageContainer
      title={`${post.title} - Nimbus Blog`}
      seo={seoData}
    >
      {/* Hero */}
      <section className="relative bg-body">
        <AnimatedBackground />
        <div className="container px-4 mx-auto py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <h1 className="font-heading tracking-tight text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-12">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div>
                By {post.author}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/30 p-8 md:p-12 shadow-lg">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-lg text-gray-900 font-semibold">
                Coming Soon
              </p>
              <p className="text-gray-700 mt-2">
                This blog post is currently being written. Check back soon for the full article.
              </p>
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to get started?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
              Start building your next project with Nimbus today.
            </p>
            <Link href="/login">
              <Button
                type="button"
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

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}
