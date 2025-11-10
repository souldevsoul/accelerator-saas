'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import FormField from '@/components/ui/form-field'
import PasswordInput from '@/components/ui/password-input'
import { AnimatedBackground } from '@/components/marketing/AnimatedBackground'
import { Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null)

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      if (isSignUp) {
        // Handle signup
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Signup failed')
        }

        setMessage({
          type: 'success',
          text: 'Account created! You can now sign in.',
        })

        // Switch to login mode
        setTimeout(() => {
          setIsSignUp(false)
          setMessage(null)
        }, 2000)
      } else {
        // Handle signin
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          throw new Error('Invalid email or password')
        }

        router.push('/dashboard')
        router.refresh()
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="antialiased min-h-screen relative">
      {/* Animated Cloud Background */}
      <AnimatedBackground />

      {/* Content */}
      <section className="relative py-12 md:py-24 overflow-hidden min-h-screen flex items-center z-10">
        <div className="relative container px-4 mx-auto w-full">
          <div>
            {/* Logo */}
            <div className="text-center mb-8">
              <Link className="inline-flex items-center gap-2.5 mb-8 group" href="/">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" transform="rotate(-45 12 12)" />
                  </svg>
                </div>
                <span className="text-2xl font-semibold text-gray-900">Nimbus</span>
              </Link>
            </div>

            {/* Form Card - Glassmorphism */}
            <div className="max-w-md p-8 mb-8 mx-auto bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl">
              <header className="mb-8">
                <h1 className="font-heading tracking-tight text-4xl font-bold mb-4 text-gray-900">
                  {isSignUp ? 'Create your account' : 'Welcome back'}
                </h1>
                <p className="text-gray-700">
                  {isSignUp
                    ? 'Start building your MVP today'
                    : 'Sign in to continue building'}
                </p>
              </header>

              <form onSubmit={handleEmailAuth} noValidate>
                {message && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                      message.type === 'error'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}
                    role="alert"
                  >
                    {message.text}
                  </div>
                )}

                {isSignUp && (
                  <FormField
                    label="Name (optional)"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                )}

                <FormField
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                <PasswordInput
                  label="Password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mb-2"
                />

                {!isSignUp && (
                  <div className="text-right mb-8">
                    <a
                      className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                  icon={<Mail className="w-5 h-5" />}
                  iconPosition="left"
                >
                  {isSignUp ? 'Sign up with Email' : 'Sign in with Email'}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setMessage(null)
                    setName('')
                  }}
                  className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                >
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </button>
              </div>

              {isSignUp && (
                <p className="mt-6 text-xs text-center text-gray-700">
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </p>
              )}
            </div>

            {isSignUp && (
              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl text-gray-900 text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Get 100 free credits when you sign up
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
