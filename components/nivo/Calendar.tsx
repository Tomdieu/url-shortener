"use client"

import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

export type nivoCalendarType = {
    day: string;
    value: number;
}

type CalendarProps = {
    data: nivoCalendarType[],
    className?: string,
    style?: React.CSSProperties,
    // from:string,
    // to:string
}

export default function Calendar({ data, className, style }: CalendarProps) {
    const colorScale = ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;

    const filteredData = data.filter((entry) => {
        const entryYear = new Date(entry.day).getFullYear();
        return entryYear === currentYear || entryYear === previousYear;
      });
    return (
        <div style={{ height: '400px', width: '100%', ...style }} className={className}>
            <ResponsiveCalendar
                data={filteredData.map((entry) => ({
                    day: entry.day,
                    value: entry.value,
                  }))}
                // from={from}
                from={`${currentYear - 1}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`}
                to={`${currentYear}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`}
                
                emptyColor="#eeeeee"
                colors={colorScale}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}

                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left',
                    },
                ]}
            />
        </div>
    )
}