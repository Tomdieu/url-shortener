"use client"

import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

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

    // console.log(data)

    const filteredData = data.filter((entry) => {
        const entryYear = new Date(entry.day).getFullYear();
        return entryYear === currentYear || entryYear === previousYear;
    });
    const weekdayLabels = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat '];
    console.log(`${currentYear}-${currentDate.getMonth() -10}-${currentDate.getDate()}`," - ",`${currentYear}-${currentDate.getMonth()+1}-${currentDate.getDate()}`)
    return (
        <div className={className} style={{...style }}>
            <CalendarHeatmap 
                startDate={`${currentYear - 1}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`}
                endDate={currentDate}
                values={filteredData.map((entry) => ({
                    date: entry.day,
                    count: entry.value,
                }))}
                showWeekdayLabels={true}
                classForValue={(value) => {
                    if (!value) {
                      return 'color-empty';
                    }
                    return `color-scale-${value.count}`;
                  }}
                  tooltipDataAttrs={(value) => {
                    return {
                      'data-tip': `${value.date} has count: ${value.count}`,
                    };
                  }}
                
                weekdayLabels={weekdayLabels}
            />
            {/* <ResponsiveCalendar
                data={filteredData.map((entry) => ({
                    day: entry.day,
                    value: entry.value,
                }))}
                
                from={`${currentYear}-${currentDate.getMonth() -10}-${currentDate.getDate()}`}
                to={`${currentYear}-${currentDate.getMonth()+1}-${currentDate.getDate()}`}

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
            /> */}
        </div>

    )
}