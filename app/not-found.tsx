import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--surface)', color: 'var(--ink)' }}
    >
      <div className="flex flex-col items-center text-center max-w-md">
        <Image
          src="/icon.png"
          width={48}
          height={48}
          alt="Trix URL"
          className="w-12 h-12 mb-8 opacity-40"
        />

        <p className="text-7xl font-bold tracking-tight mb-2" style={{ letterSpacing: '-0.03em' }}>
          404
        </p>

        <h1 className="text-xl font-semibold mb-2">Page not found</h1>

        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="btn-primary"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
