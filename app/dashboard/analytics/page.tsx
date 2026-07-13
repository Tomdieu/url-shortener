import Analytics from '@/components/analytics'
import {
  getTopBrowserAnalytics,
  getTopCountriesAnalytics,
  getTopPlatformsAnalytics,
  getTopReferrersAnalytics,
} from '@/lib'
import DetailCard from '@/components/Link/DetailCard'

export default async function AnalyticsPage() {
  const topReferrer = await getTopReferrersAnalytics()
  const topBrowsers = await getTopBrowserAnalytics()
  const topPlatforms = await getTopPlatformsAnalytics()
  const topCountries = await getTopCountriesAnalytics()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>

      <Analytics />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topReferrer && topReferrer.length > 0 && (
          <DetailCard title="Top referrers" description="Clicks" items={topReferrer} />
        )}
        {topCountries && topCountries.length > 0 && (
          <DetailCard title="Top locations" description="Clicks" items={topCountries} />
        )}
        {topBrowsers && topBrowsers.length > 0 && (
          <DetailCard title="Top browsers" description="Clicks" items={topBrowsers} />
        )}
        {topPlatforms && topPlatforms.length > 0 && (
          <DetailCard title="Top platforms" description="Clicks" items={topPlatforms} />
        )}
      </div>
    </div>
  )
}
