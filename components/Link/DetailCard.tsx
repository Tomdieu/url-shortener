import { formatNumber } from '@/lib/formatNumber'

type Items = {
  label: string
  value: number
}

type DetailCardProps = {
  title: string
  description: string
  items: Items[]
}

export default function DetailCard({ title, description, items }: DetailCardProps) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>
          {description}
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
        {items.map(({ value, label }) => (
          <div
            key={label}
            className="flex items-center justify-between px-5 py-2.5"
          >
            <span className="text-sm truncate">{label}</span>
            <span className="text-sm font-semibold ml-4 tabular-nums">
              {formatNumber(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
