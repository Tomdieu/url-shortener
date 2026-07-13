'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Link2, ArrowRight, Copy, Check } from 'lucide-react'

const Hero = () => {
  const [url, setUrl] = useState('')
  const [shortened, setShortened] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleShorten = async () => {
    if (!url.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()
      if (data.shortUrl) {
        setShortened(data.shortUrl)
      }
    } catch {
      setShortened('https://trixurl.vercel.app/demo')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (shortened) {
      navigator.clipboard.writeText(shortened)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleShorten()
  }

  return (
    <section className="relative overflow-hidden landing-section">
      <div className="landing-container relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Free to use — no signup required
          </span>
        </div>

        <h1 className="landing-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mb-6">
          Short links,{' '}
          <span className="relative">
            big insights
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none">
              <path d="M2 8 C50 2, 150 2, 198 8" stroke="oklch(0.72 0.15 195)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="landing-subtext text-base sm:text-lg md:text-xl mb-10">
          Transform long URLs into clean, trackable links. Monitor every click
          with real-time analytics — geographic data, referrers, devices, and more.
        </p>

        <div className="w-full max-w-2xl mb-8">
          <div className="url-input-wrapper">
            <div className="flex items-center pl-3">
              <Link2 className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste your long URL here..."
              className="url-input"
            />
            <button
              onClick={handleShorten}
              disabled={loading || !url.trim()}
              className="btn-primary !rounded-xl !px-5 !py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none whitespace-nowrap"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Shorten
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {shortened && (
            <div className="mt-4 flex items-center justify-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-5 py-3">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-md">
                {shortened}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400 dark:text-zinc-500">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Click analytics
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Geo tracking
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            QR codes
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Spam protection
          </span>
        </div>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan-400/5 blur-3xl" />
      </div>
    </section>
  )
}

export default Hero
