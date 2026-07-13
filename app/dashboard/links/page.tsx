'use client'

import LinkTables from '@/components/Link/LinkTables'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import ShortendUrlButton from '@/components/Link/ShortendUrlButton'
import { getLinks } from '@/lib/getLinks'

export default function Links() {
  const { isPending, isFetched, data } = useQuery({
    queryFn: async () => getLinks(),
    queryKey: ['links'],
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Links</h1>
        <ShortendUrlButton />
      </div>

      {isPending && (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      )}

      {isFetched && !data && (
        <div
          className="text-center py-16 rounded-xl border"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
            You don&apos;t have any links yet.
          </p>
        </div>
      )}

      {data && <LinkTables links={data} />}
    </div>
  )
}
