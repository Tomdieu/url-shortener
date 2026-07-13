export interface ClickData {
    timestamp: string;
    clicks: number;
}

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

export const sort = (clickData: ClickData[]) => {
    return clickData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export const extractWeekDay = (clickData: ClickData[]) => {
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

    Array.from({ length: 7 }).map((_, index) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - index);
        sevenDays[newDate.toDateString()] = 0;
    });

    clickData.forEach((items) => {
        sevenDays[items.timestamp] = items.clicks;
    });

    const formattedClickData: ClickData[] = Object.entries(sevenDays).map(([timestamp, clicks]) => ({
        timestamp,
        clicks,
    }));

    return extractWeekDay(sort(formattedClickData));
};

export const formaliseYear = (clickData: ClickData[]) => {
    const currentDate = new Date();

    const twoYears: Record<string, number> = {}

    Array.from({ length: 2 }).map((_, index) => {
        currentDate.setFullYear(currentDate.getFullYear() - index);
        twoYears[currentDate.getFullYear().toString()] = 0
    })

    clickData.forEach((items) => {
        twoYears[items.timestamp] = items.clicks;
    });

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

    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return formattedClickData.sort((a, b) => monthOrder.indexOf(a.timestamp) - monthOrder.indexOf(b.timestamp));
}

export function extractHostIfValidURL(str: string) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (urlRegex.test(str)) {
        const url = new URL(str);
        return url.host;
    }

    return str;
}
