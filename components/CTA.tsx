import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CTA = () => {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 dark:bg-zinc-100 px-8 py-16 sm:px-16 sm:py-20 text-center">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          </div>

          <h2 className="landing-heading text-3xl sm:text-4xl md:text-5xl text-white dark:text-zinc-900 mb-4">
            Ready to shorten?
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-500 max-w-lg mx-auto mb-8">
            Join thousands of users who trust Trix URL for fast, reliable link
            management with built-in analytics.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all hover:shadow-lg"
          >
            Get started for free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA
