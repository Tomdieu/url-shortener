"use client"
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import prisma from "@/lib/prismadb";
import { User } from '@prisma/client';

interface ChartData {
    url: string;
    clicks: number;
}

type BarChartLinksProps = {
    chartData: ChartData[]
}

const BarChartLinks:React.FC<BarChartLinksProps> = ({chartData}) => {
    const [data, setData] = useState<ChartData[]>(chartData);


    return (
        <BarChart width={600} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="url" hide={true} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clicks" fill="#8884d8" />
        </BarChart>
    );
};

export default BarChartLinks;
