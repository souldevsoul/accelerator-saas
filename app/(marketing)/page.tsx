'use client'

import PageContainer from '@/components/layout/page-container';
import { AnimatedBackground } from '@/components/marketing/AnimatedBackground';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, Users, GitBranch, Eye, Check, ArrowRight, Code, Rocket, Shield, Clock, Star, TrendingUp, Sparkles, Bolt, Globe, Lock } from 'lucide-react';

export default function HomePage() {
  const seoData = {
    description: 'Velocity helps teams build and ship MVPs faster with AI-powered code generation, expert developers, and seamless workflows.',
    keywords: ['MVP development', 'AI code generation', 'rapid prototyping', 'developer platform', 'startup tools']
  };

  return (
    <PageContainer
      title="Nimbus - Rise Above the Clouds"
      seo={seoData}
    >
      {/* Three.js Animated Background */}
      <AnimatedBackground />

      {/* Hero Section - MASSIVE BOLD TEXT */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            {/* Frosted Glass Background */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-3xl -z-10"></div>

            {/* MASSIVE HERO HEADING */}
            <h1 className="font-heading tracking-tighter text-7xl sm:text-8xl lg:text-9xl font-black mb-8 leading-none pt-16">
              <span className="block text-gray-900 drop-shadow-lg">RISE</span>
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent drop-shadow-lg animate-gradient">
                ABOVE
              </span>
              <span className="block text-gray-900 drop-shadow-lg">THE CLOUDS</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-800 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Ship your ideas into <span className="font-semibold text-blue-600">production</span> at the speed of flight.
              <span className="block mt-2">AI-powered. Cloud-native. <span className="font-semibold text-blue-700">Sky high</span>.</span>
            </p>

            {/* CTA Buttons - SLICK & MODERN */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <Link href="/login">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 hover:from-cyan-600 hover:via-blue-700 hover:to-blue-800 text-white font-black text-xl px-14 py-8 rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.5)] hover:shadow-[0_20px_60px_rgba(6,182,212,0.7)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-cyan-400/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative z-10">START BUILDING NOW</span>
                </Button>
              </Link>
              <Link href="/pricing">
                <Button className="group relative overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20 text-gray-900 font-bold text-xl px-14 py-8 rounded-xl shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-2 border-white/30 hover:border-white/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative z-10">VIEW PRICING</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="relative bg-white/40 backdrop-blur-md rounded-3xl p-12 border border-white/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-black text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                10K+
              </div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Projects Launched</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-black text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                95%
              </div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">User Satisfaction</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-black text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                3min
              </div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Average Build</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-black text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                24/7
              </div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Expert Support</div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto bg-white/40 backdrop-blur-md rounded-3xl p-12 border border-white/30">
            <div className="text-center mb-20">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">Features</p>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Everything you need <span className="text-blue-600">to soar</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'AI-Powered Generation',
                  description: 'Production-ready code in 3 minutes. Modern tech stack with database & authentication included.',
                  features: ['Next.js + React', 'TypeScript by default', 'Database ready']
                },
                {
                  icon: Code,
                  title: 'Clean Architecture',
                  description: 'Maintainable, well-structured code following industry best practices.',
                  features: ['Component-based architecture', 'Easy to customize', 'Fully documented']
                },
                {
                  icon: GitBranch,
                  title: 'GitHub Integration',
                  description: 'Seamless version control with automated deployment workflows.',
                  features: ['Auto repository creation', 'PR automation', 'Built-in code reviews']
                },
                {
                  icon: Eye,
                  title: 'Instant Previews',
                  description: 'See changes live in real-time. Share preview links instantly.',
                  features: ['Live preview URLs', 'Team collaboration', 'Mobile responsive']
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'SOC 2 compliant with built-in authentication and encryption.',
                  features: ['NextAuth integration', 'SOC 2 compliant', 'Encrypted data storage']
                },
                {
                  icon: Rocket,
                  title: 'One-Click Deploy',
                  description: 'Deploy to any platform with global CDN and automatic SSL.',
                  features: ['Vercel integration', 'Auto SSL certificates', 'Global CDN']
                }
              ].map((feature, idx) => (
                <div key={idx} className="group p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="space-y-3">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-blue-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center bg-white/40 backdrop-blur-md rounded-3xl p-16 border border-white/30">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
              Ready to take <span className="text-blue-600">flight?</span>
            </h2>
            <p className="text-2xl text-gray-800 mb-12">
              Join 10,000+ developers building faster with AI. <span className="block mt-2 text-blue-700">Start free, no credit card required.</span>
            </p>
            <Link href="/login">
              <Button className="group relative overflow-hidden bg-white hover:bg-gray-100 text-blue-600 font-black text-2xl px-16 py-10 rounded-2xl shadow-[0_30px_60px_rgba(255,255,255,0.3)] hover:shadow-[0_30px_80px_rgba(255,255,255,0.4)] transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">Start Building Free</span>
              </Button>
            </Link>
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-gray-700">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>24/7 Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-600" />
                <span>10K+ Projects Launched</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
