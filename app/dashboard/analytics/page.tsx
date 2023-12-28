import Analytics from "@/components/analytics";
import {
    getTopBrowserAnalytics,
    getTopCountriesAnalytics,
    getTopPlatformsAnalytics,
    getTopReferrersAnalytics
} from "@/lib";
import DetailCard from "@/components/Link/DetailCard";
import React from "react";

export default async function AnalyticsPage(){
    
    const topReferrer = await getTopReferrersAnalytics()
    const topBrowsers = await getTopBrowserAnalytics();
    const topPlatforms = await getTopPlatformsAnalytics()
    const topCountries = await getTopCountriesAnalytics()
    
    return (
        <div className={"flex w-full h-full flex-col gap-3"}>
            <h1>Analytics</h1>
            <Analytics/>
            <div className={`grid md:grid-cols-3 gap-3`}>
                {topReferrer && topReferrer.length > 0 && <DetailCard title={"Top Referrers"} description={"Clicks"} items={topReferrer}/>}

                {topCountries && topCountries.length > 0 && <DetailCard title={"Top Locations"} description={"Clicks"} items={topCountries}/>}

                {topBrowsers && topBrowsers.length > 0 && <DetailCard title={"Top Browsers"} description={"Clicks"} items={topBrowsers}/>}

                {topPlatforms && topPlatforms.length > 0 && <DetailCard title={"Top Devices"} description={"Clicks"} items={topPlatforms} /> }
            </div>
        </div>
    )
}