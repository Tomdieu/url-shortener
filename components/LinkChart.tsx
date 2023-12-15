"use client"

import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, LineChart, Line,ResponsiveContainer } from 'recharts';
import {CurveType} from "recharts/types/shape/Curve";


interface ClickData {
    timestamp: string;
    clicks: number;
}
interface ClickLineChartProps {
    clickDatas: ClickData[]; // Provide the link ID for the specific link you want to chart
    type?: "line" | "bar",
    fill?:string;
    lineType?:CurveType
}


const LinkChart: React.FC<ClickLineChartProps> = ({ clickDatas, type = "bar",fill="#000",lineType="bump" }) => {
    const [data, setData] = useState<ClickData[]>(clickDatas);

    if (type === "bar") {

        return (
            <ResponsiveContainer className={'w-full h-full'}>


            <BarChart data={data}>
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar  dataKey="clicks" fill={fill} />
            </BarChart>
            </ResponsiveContainer>
        );
    } else {
        return (
            <ResponsiveContainer className={'w-full h-full'}>
            <LineChart data={data}>
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type={lineType} dataKey="clicks" stroke={fill} />
            </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default LinkChart;