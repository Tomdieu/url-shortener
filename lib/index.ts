"use server"
import prisma from "./prismadb"
import { ClickData, getLinkChartDetail } from "./getLinkChartDetail";
import getCurrentUser from "@/lib/getCurrentUser";
import {getLinks} from "@/lib/getLinks";

export const minus7Days = (currentDate: Date): Date => {
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    return sevenDaysAgo;
}

export const minus3Month = (currentDate: Date) => {
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    return threeMonthsAgo;
}

export const minus1Year = (currentDate: Date) => {
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    return oneYearAgo;
}


const sort = (clickData: ClickData[]) => {
    // Convert timestamps to Date objects before sorting
    return clickData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

const extractWeekDay = (clickData: ClickData[]) => {
    const extractedDay: ClickData[] = clickData.map(({ clicks, timestamp }) => {
        const dayName = new Date(timestamp).toLocaleDateString('en-US', { weekday: 'short' });
        return {
            clicks,
            timestamp: dayName
        }
    })

    return extractedDay;
}

export const formaliseDay = (clickData: ClickData[]) => {
    const currentDate = new Date();
    const sevenDays: Record<string, number> = {};

    // Populate the sevenDays object with timestamps for the last 7 days
    Array.from({ length: 7 }).map((_, index) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - index);
        sevenDays[newDate.toDateString()] = 0;
    });

    // Update the sevenDays object with the actual click data
    clickData.forEach((items) => {
        sevenDays[items.timestamp] = items.clicks;
    });

    // Convert the sevenDays object into an array of ClickData
    const formattedClickData: ClickData[] = Object.entries(sevenDays).map(([timestamp, clicks]) => ({
        timestamp,
        clicks,
    }));

    // Sort the formattedClickData array by timestamp
    return extractWeekDay(sort(formattedClickData));
};

export const getTopReferrersAnalytics = async () => {
    const user = await getCurrentUser();
    if(!user) return null

    const links = await getLinks()

    const totalReferres : Record<string, number> = {}

    await Promise.all(links.map(async (link)=>{
        const referrers:Record<string, number> = {}

        link.clicks.map(({referrer})=>{
            if(referrer){
                if(referrer in referrers){
                    referrers[referrer] = referrers[referrer] + 1
                    totalReferres[referrer] = (totalReferres[referrer] || 0) + 1
                }
                else{
                    referrers[referrer] = 0
                }
            }

        })
    }))

    const formattedReferred = Object.entries(totalReferres).map(([label,value])=>({label,value}))

    return formattedReferred.slice(0,5)

}

export const getTopBrowserAnalytics = async  () => {
    const user = await getCurrentUser();
    if(!user) return null

    const links = await getLinks()

    const totalBrowsers : Record<string, number> = {}

    await Promise.all(links.map(async (link)=>{
        const browsers:Record<string, number> = {}

        link.clicks.map(({browser})=>{
            if(browser){
                if(browser in browsers){
                    browsers[browser] = browsers[browser] + 1
                    totalBrowsers[browser] = (totalBrowsers[browser] || 0) + 1
                }
                else{
                    browsers[browser] = 0
                }
            }

        })
    }))

    const formattedReferred = Object.entries(totalBrowsers).map(([label,value])=>({label,value}))

    return formattedReferred.slice(0,5)
}

export const getTopPlatformsAnalytics = async () => {
    const user = await getCurrentUser();
    if(!user) return null

    const links = await getLinks()

    const totalPlatforms : Record<string, number> = {}

    await Promise.all(links.map(async (link)=>{
        const platforms:Record<string, number> = {}

        link.clicks.map(({os})=>{
            if(os){
                if(os in platforms){
                    platforms[os] = platforms[os] + 1
                    totalPlatforms[os] = (totalPlatforms[os] || 0) + 1
                }
                else{
                    platforms[os] = 0
                }
            }

        })
    }))

    const formattedReferred = Object.entries(totalPlatforms).map(([label,value])=>({label,value}))

    return formattedReferred.slice(0,5)
}

export const getTopCountriesAnalytics = async () =>{
    const user = await getCurrentUser();
    if(!user) return null

    const links = await getLinks()

    const totalCountries : Record<string, number> = {}

    await Promise.all(links.map(async (link)=>{
        const countries:Record<string, number> = {}

        link.clicks.map(({country})=>{
            if(country){
                if(country in countries){
                    countries[country] = countries[country] + 1
                    totalCountries[country] = (totalCountries[country] || 0) + 1
                }
                else{
                    countries[country] = 0
                }
            }

        })
    }))

    const formattedReferred = Object.entries(totalCountries).map(([label,value])=>({label,value}))

    return formattedReferred.slice(0,5)
}

// export const

export const getAllMonthsAnalyticsByYear = async (year:number) => {
    const user = await getCurrentUser();

    if(user){
        const links = await getLinks();
        const total12Months:Record<string,number> = {};

        Array.from({length:12}).forEach((_, index) => {
            const newDate = new Date();
            newDate.setMonth(newDate.getMonth() - index-1);
            total12Months[newDate.toLocaleString('default', { month: 'long' })] = 0;
        });


        await Promise.all(links.map(async (link)=>{
            const twelveMonths:Record<string,number> = {};

            Array.from({length:12}).forEach((_,index)=>{
                const newDate = new Date()
                newDate.setMonth(newDate.getMonth() - 1);
                twelveMonths[newDate.toLocaleString('default', { month: 'long' })] = 0
            })

            const clickData = await getLinkChartDetail(link.short, 'month');

            clickData.forEach((items) => {
                twelveMonths[items.timestamp] = items.clicks
                total12Months[items.timestamp] = (total12Months[items.timestamp] || 0) + items.clicks;

            })

        }))

        const formattedClickData: ClickData[] = Object.entries(total12Months).map(([timestamp, clicks]) => ({
            timestamp,
            clicks,
        }));

        const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return formattedClickData.sort((a, b) => monthOrder.indexOf(a.timestamp) - monthOrder.indexOf(b.timestamp));

    }

    return null

}

export const getChartsLinks = async () => {
    const user = await getCurrentUser();

    if (user) {
        const links = await getLinks();
        const totalSevenDays: Record<string, number> = {};

        Array.from({length: 7}).forEach((_, index) => {
            const newDate = new Date();
            newDate.setDate(newDate.getDate() - index);
            totalSevenDays[newDate.toDateString()] = 0;
        });

        // Map over each link and accumulate the click data into totalSevenDays
        await Promise.all(links.map(async (link) => {
            const sevenDays: Record<string, number> = {};

            Array.from({length: 7}).forEach((_, index) => {
                const newDate = new Date();
                newDate.setDate(newDate.getDate() - index);
                sevenDays[newDate.toDateString()] = 0;
            });

            const clickData = await getLinkChartDetail(link.short, 'day');

            clickData.forEach((items) => {
                sevenDays[items.timestamp] += items.clicks;
                totalSevenDays[items.timestamp] = (totalSevenDays[items.timestamp] || 0) + items.clicks;
            });

        }));

        // Convert the totalSevenDays object into an array of ClickData
        const formattedClickData: ClickData[] = Object.entries(totalSevenDays).map(([timestamp, clicks]) => ({
            timestamp,
            clicks,
        }));

        return extractWeekDay(sort(formattedClickData));
    }
}

export const formaliseYear = (clickData: ClickData[]) => {
    const currentDate = new Date();

    const twoYears: Record<string, number> = {}

    Array.from({ length: 2 }).map((_, index) => {
        currentDate.setFullYear(currentDate.getFullYear() - index);
        twoYears[currentDate.getFullYear().toString()] = 0
    })

    // Update the sevenDays object with the actual click data
    clickData.forEach((items) => {
        twoYears[items.timestamp] = items.clicks;
    });

    // Convert the sevenDays object into an array of ClickData
    const formattedClickData: ClickData[] = Object.entries(twoYears).map(([timestamp, clicks]) => ({
        timestamp,
        clicks,
    }));

    return formattedClickData.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));

}

export const formaliseMonth = (clickData: ClickData[]) => {
    const currentDate = new Date();

    const threeMonths: Record<string, number> = {};

    Array.from({ length: 3 }).map((_, index) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - index)
        threeMonths[newDate.toLocaleString('default', { month: 'long' })] = 0
    })

    clickData.forEach((items) => {
        threeMonths[items.timestamp] = items.clicks
    })

    const formattedClickData: ClickData[] = Object.entries(threeMonths).map(([timestamp, clicks]) => ({
        timestamp,
        clicks,
    }));

    // Sort the formattedClickData array by month name
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return formattedClickData.sort((a, b) => monthOrder.indexOf(a.timestamp) - monthOrder.indexOf(b.timestamp));

}

function extractHostIfValidURL(str: string) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (urlRegex.test(str)) {
        const url = new URL(str);
        return url.host;
    }

    return str;
}


export const getUrlTopReferreDomain = async (urlShortCode: string) => {
    const linkData = await prisma.link.findUnique({ where: { short: urlShortCode }, include: { clicks: true } })

    const referrs: Record<string, number> = {}

    linkData?.clicks.map((data) => {
        const isPresent = data?.referrer! in referrs
        const host = extractHostIfValidURL(data?.referrer!) || data.referrer // extractHostIfValidURL(data.referrer)

        if (host) {
            if (isPresent) {
                referrs[host] += 1

            } else {
                referrs[host] = 1

            }
        }

    })

    return Object.entries(referrs).map(([domain, count]) => ({
        label: domain,
        value: count
    }))


}

export const getUrlTopLocations = async (urlShortCode: string) => {
    const linkData = await prisma.link.findUnique({ where: { short: urlShortCode }, include: { clicks: true } })

    const countries: Record<string, number> = {};

    linkData?.clicks.map((data) => {
        const isPresent = data?.country! in countries
        const country = data.country
        if (country) {
            if (isPresent) {
                countries[country] += 1
            } else {
                countries[country] = 1
            }
        }
    })


    return Object.entries(countries).map(([country, count]) => ({
        label: country,
        value: count
    }))

}

export const getUrlTopDevices = async (urlShortCode: string) => {
    const linkData = await prisma.link.findUnique({ where: { short: urlShortCode }, include: { clicks: true } })

    const devices: Record<string, number> = {}

    linkData?.clicks.map((data) => {

        const device = data.device

        const isPresent = device! in devices

        if (device) {
            if (isPresent) {
                devices[device] += 1
            } else {
                devices[device] = 1
            }
        }
    }
    )

    return Object.entries(devices).map(([device, count]) => ({
        label: device,
        value: count
    }))

}

export const getTopBrowser = async (urlShortCode: string) => {
    const linkData = await prisma.link.findUnique({ where: { short: urlShortCode }, include: { clicks: true } })

    const browsers: Record<string, number> = {}

    linkData?.clicks.map((data) => {

        const browser = data.browser

        const isPresent = browser! in browsers

        if (browser) {
            if (isPresent) {
                browsers[browser] += 1
            } else {
                browsers[browser] = 1
            }
        }
    }
    )

    return Object.entries(browsers).map(([browser, count]) => ({
        label: browser,
        value: count
    }))
}

const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
}
