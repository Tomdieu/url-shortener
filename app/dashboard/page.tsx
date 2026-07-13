import TopShortenUrl from '@/components/Link/TopShortenUrl'
import { getAverageClickRate } from '@/lib/getAverageClickRate'
import { getChartLinkData } from '@/lib/getChartLinkData'
import getCurrentUser from '@/lib/getCurrentUser'
import { getNumberOfShortenLinks } from '@/lib/getNumberOfShortenLinks'
import { getTopShortenedUrls } from '@/lib/getTopShortenedUrls'
import { getTotalNumberOfClick } from '@/lib/getTotalNumberOfClick'
import { formatNumber } from '@/lib/formatNumber'
import { getChartsLinks } from '@/lib'
import CustomLineChart from '@/components/charts/CustomLineChart'
import { Link2, MousePointerClick, TrendingUp } from 'lucide-react'
import { redirect } from 'next/navigation'

const statIcons = {
  links: Link2,
  clicks: MousePointerClick,
  rate: TrendingUp,
} as const

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
}) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium" style={{ color: 'var(--ink-muted)' }}>
          {label}
        </span>
        <div
          className="flex items-center justify-center h-8 w-8 rounded-lg"
          style={{ background: 'var(--brand-dim)' }}
        >
          <Icon className="h-4 w-4" style={{ color: 'oklch(0.72 0.15 195)' }} />
        </div>
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
  )
}

const Dashboard = async () => {
  const user = await getCurrentUser()
  if (!user) return redirect('/auth/login?callbackUrl=%2Fdashboard')

  const numberOfShortendLinks = await getNumberOfShortenLinks(user.id as string)
  const topShortendUrls = await getTopShortenedUrls(user.id as string)
  const averageClickRate = await getAverageClickRate(user.id as string)
  const toatalNumberOfClicks = await getTotalNumberOfClick(user.id as string)
  const chartData = await getChartsLinks()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          label="Total links"
          value={formatNumber(numberOfShortendLinks)}
          icon={statIcons.links}
        />
        <StatCard
          label="Total clicks"
          value={formatNumber(toatalNumberOfClicks)}
          icon={statIcons.clicks}
        />
        <StatCard
          label="Avg. click rate"
          value={`${averageClickRate.toFixed(2)}%`}
          icon={statIcons.rate}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopShortenUrl shortenedUrls={topShortendUrls} />
        {chartData && (
          <div
            className="rounded-xl border p-5"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <h3 className="text-sm font-semibold mb-4">Click trends</h3>
            <CustomLineChart
              tooltip={true}
              xDataKey="timestamp"
              data={chartData}
              datakey="clicks"
              fill="#000"
              className="w-full h-[300px]"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
