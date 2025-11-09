import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-violet-950 border-t border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <span className="text-violet-900 font-bold text-lg">A</span>
              </div>
              <span className="text-lg font-semibold text-white">Accelerator</span>
            </div>
            <p className="text-sm text-white text-opacity-70 leading-relaxed max-w-xs">
              Turn your ideas into working MVPs with AI and expert developers.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white border-opacity-20 text-white text-opacity-70 hover:text-opacity-100 hover:border-opacity-40 transition"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white border-opacity-20 text-white text-opacity-70 hover:text-opacity-100 hover:border-opacity-40 transition"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white border-opacity-20 text-white text-opacity-70 hover:text-opacity-100 hover:border-opacity-40 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/experts" className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition">
                  Experts
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition">
                  Try Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/acceptable-use"
                  className="text-sm text-white text-opacity-70 hover:text-opacity-100 transition"
                >
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white border-opacity-10">
          <p className="text-center text-sm text-white text-opacity-70">
            © {new Date().getFullYear()} Accelerator. All rights reserved. Built on{' '}
            <a
              href="https://github.com/firecrawl/open-lovable"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-opacity-100 hover:underline font-medium"
            >
              Open Lovable
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
