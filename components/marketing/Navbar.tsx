'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: User | null } }) => {
      setUser(user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return (
    <nav className="py-5 border-b border-white border-opacity-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg flex items-center justify-center transition-transform hover:scale-105">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" transform="rotate(-45 12 12)" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white">Nimbus</span>
          </Link>

          <div className="hidden lg:flex gap-2 p-1 rounded-full bg-white bg-opacity-10">
            <Link
              href="/how-it-works"
              className="px-3 py-2 rounded-full text-white text-sm hover:bg-white hover:bg-opacity-20 transition duration-200"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2 rounded-full text-white text-sm hover:bg-white hover:bg-opacity-20 transition duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/experts"
              className="px-3 py-2 rounded-full text-white text-sm hover:bg-white hover:bg-opacity-20 transition duration-200"
            >
              Experts
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 rounded-full text-white text-sm hover:bg-white hover:bg-opacity-20 transition duration-200"
            >
              Blog
            </Link>
          </div>

          <Link
            href="/login"
            className="hidden lg:flex items-center gap-2 text-white hover:text-pink-500 transition duration-200"
          >
            <span className="text-sm font-medium">
              {user ? 'Dashboard' : 'Sign in'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5.5 3L10.5 8L5.5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white border-opacity-10">
            <div className="space-y-1 mb-6">
              <Link
                href="/how-it-works"
                className="block px-4 py-3 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="block px-4 py-3 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/experts"
                className="block px-4 py-3 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Experts
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-3 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </div>

            <div className="space-y-2 pt-4 border-t border-white border-opacity-10">
              {user ? (
                <Link
                  href="/dashboard"
                  className="block px-6 py-3 text-sm font-semibold text-center text-violet-900 bg-white rounded-lg hover:bg-opacity-90 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-6 py-3 text-sm font-semibold text-center text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/login"
                    className="block px-6 py-3 text-sm font-semibold text-center text-violet-900 bg-white rounded-lg hover:bg-opacity-90 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
