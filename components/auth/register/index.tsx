'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Eye, EyeOff, ArrowRight, Github, Loader2 } from 'lucide-react'
import { LINKS } from '@/constants'

const RegisterForm = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const { name, email, password } = Object.fromEntries(formData.entries())

    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then(() => {
        toast.success('Account created successfully')
        router.push('/auth/login')
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">Create an account</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--ink-muted)' }}>
        Start shortening and tracking your links
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="flex h-10 w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors placeholder:opacity-50 focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--ink)',
              background: 'transparent',
              ['--tw-ring-color' as string]: 'oklch(0.72 0.15 195)',
            }}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="flex h-10 w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors placeholder:opacity-50 focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--ink)',
              background: 'transparent',
              ['--tw-ring-color' as string]: 'oklch(0.72 0.15 195)',
            }}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={isVisible ? 'text' : 'password'}
              required
              placeholder="Create a password"
              className="flex h-10 w-full rounded-xl border px-3.5 pr-10 py-2 text-sm outline-none transition-colors placeholder:opacity-50 focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--ink)',
                background: 'transparent',
                ['--tw-ring-color' as string]: 'oklch(0.72 0.15 195)',
              }}
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity"
            >
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full !rounded-xl !py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white dark:bg-zinc-950" style={{ color: 'var(--ink-muted)' }}>
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="flex items-center justify-center gap-2 h-10 rounded-xl border text-sm font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
          style={{ borderColor: 'var(--border)', color: 'var(--ink)' }}
        >
          <Github className="h-4 w-4" />
          GitHub
        </button>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="flex items-center justify-center gap-2 h-10 rounded-xl border text-sm font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
          style={{ borderColor: 'var(--border)', color: 'var(--ink)' }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
      </div>

      <p className="text-center text-sm mt-8" style={{ color: 'var(--ink-muted)' }}>
        Already have an account?{' '}
        <Link href={LINKS.login} className="font-semibold hover:underline underline-offset-4" style={{ color: 'var(--ink)' }}>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm
