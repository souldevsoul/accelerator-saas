import Link from 'next/link'
import PageContainer from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const seoData = {
    description: 'Read the latest from Velocity - tips, tutorials, and insights on AI-powered development.',
    keywords: ['blog', 'articles', 'tutorials', 'AI development', 'MVP', 'software development']
  }

  const posts = [
    {
      title: 'Building Your First MVP in Under an Hour',
      excerpt: 'Learn how to use Velocity to build and deploy a complete MVP from idea to production in less than 60 minutes.',
      date: '2024-03-15',
      readTime: '8 min read',
      category: 'Tutorial',
      slug: 'building-first-mvp'
    },
    {
      title: 'The Future of AI-Powered Development',
      excerpt: 'Explore how AI is transforming the software development landscape and what it means for developers.',
      date: '2024-03-10',
      readTime: '6 min read',
      category: 'Insights',
      slug: 'future-ai-development'
    },
    {
      title: 'How We Built Velocity\'s AI Engine',
      excerpt: 'A deep dive into the technology and architecture behind Velocity\'s AI-powered code generation.',
      date: '2024-03-05',
      readTime: '12 min read',
      category: 'Technical',
      slug: 'ai-engine-architecture'
    },
    {
      title: 'Best Practices for Task-Based Development',
      excerpt: 'Tips and strategies for breaking down features into tasks and managing development workflows efficiently.',
      date: '2024-02-28',
      readTime: '5 min read',
      category: 'Best Practices',
      slug: 'task-based-development'
    },
    {
      title: 'From Idea to Production: A Case Study',
      excerpt: 'How one startup used Velocity to go from concept to paying customers in just 2 weeks.',
      date: '2024-02-20',
      readTime: '10 min read',
      category: 'Case Study',
      slug: 'startup-case-study'
    },
    {
      title: 'Security Best Practices for AI-Generated Code',
      excerpt: 'Essential security considerations when working with AI-generated code in production applications.',
      date: '2024-02-15',
      readTime: '7 min read',
      category: 'Security',
      slug: 'security-best-practices'
    }
  ]

  return (
    <PageContainer
      title="Blog - Velocity"
      seo={seoData}
    >
      {/* Hero */}
      <section className="relative bg-body">
        <div className="container px-4 mx-auto py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-gray-900">
              Blog & Resources
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Insights, tutorials, and stories from the world of AI-powered development.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-gray-50 py-12">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-800 to-purple-900"></div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                    Featured
                  </span>
                  <span className="text-gray-500 text-sm">
                    {posts[0].category}
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{posts[0].readTime}</span>
                  </div>
                </div>
                <Link href={`/blog/${posts[0].slug}`}>
                  <Button variant="primary">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="bg-white py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <article key={index} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="aspect-[16/9] bg-gradient-to-br from-purple-800 to-purple-900 group-hover:scale-105 transition-transform"></div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-purple-600">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-purple-600 font-semibold hover:underline inline-flex items-center gap-2">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-800 to-purple-900 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Stay updated
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest articles, tutorials, and product updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-3 rounded-lg outline-none"
              />
              <Button variant="secondary" size="large">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
