"use client"
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';

import {cn} from "@/lib/utils";

interface ChartData {
    url: string;
    clicks: number;
}

type BarChartLinksProps = {
    chartData: ChartData[],
    fillColor?:string,
    className?:string
}

const BarChartLinks:React.FC<BarChartLinksProps> = ({chartData,fillColor,className}) => {
    const [data, setData] = useState<ChartData[]>(chartData);


    return (
        <ResponsiveContainer className={cn("h-full w-full",className)}>
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="url" hide={true} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clicks" fill={fillColor ? fillColor : "#8884d8"} />
        </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartLinks;
