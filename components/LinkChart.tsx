"use client"

import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, LineChart, Line } from 'recharts';


interface ClickData {
    timestamp: string;
    clicks: number;
}
interface ClickLineChartProps {
    clickDatas: ClickData[]; // Provide the link ID for the specific link you want to chart
    type?: "line" | "bar",
}


const LinkChart: React.FC<ClickLineChartProps> = ({ clickDatas, type = "bar" }) => {
    const [data, setData] = useState<ClickData[]>(clickDatas);

    if (type === "bar") {

        return (
            <BarChart width={600} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill="#8884d8" />
            </BarChart>
        );
    } else {
        return (
            <LineChart width={600} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
            </LineChart>
        );
    }
}

export default LinkChart;