import { Click, Link } from '@/lib/generated/prisma/client'
import { formatNumber } from '@/lib/formatNumber'
import { ExternalLink } from 'lucide-react'

type LinkType = Link & {
  clicks: Click[]
}

type Props = {
  shortenedUrls: LinkType[]
}

const TopShortenUrl = ({ shortenedUrls }: Props) => {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <h3 className="text-sm font-semibold mb-1">Top shortened URLs</h3>
      <p className="text-xs mb-4" style={{ color: 'var(--ink-muted)' }}>
        {shortenedUrls.length} most-clicked links
      </p>

      <div className="space-y-3">
        {shortenedUrls.length === 0 && (
          <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
            No links yet. Create your first short link to see analytics here.
          </p>
        )}
        {shortenedUrls.map((url) => (
          <div
            key={url.id}
            className="flex items-center justify-between gap-3 py-2 border-b last:border-0"
            style={{ borderColor: 'var(--border)' }}
          >
            <a
              href={url.original}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium truncate min-w-0 hover:underline underline-offset-4"
            >
              <span className="truncate">
                {process.env.NEXT_PUBLIC_URL}/{url.short}
              </span>
              <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-40" />
            </a>
            <span
              className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg"
              style={{ background: 'var(--brand-dim)', color: 'oklch(0.72 0.15 195)' }}
            >
              {url.clicks.length < 10
                ? `0${url.clicks.length}`
                : formatNumber(url.clicks.length)}{' '}
              clicks
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopShortenUrl
