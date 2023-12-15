"use client"
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend} from 'recharts';
import {DataKey} from "recharts/types/util/types";
import {useTheme} from "next-themes";

type CustomBarChartProps = {
    data:any[],
    dataKey:DataKey<any>;
    xDataKey:DataKey<any>;
    barSize?:number;
    fill?:string;
    className?:string;
    tooltip?:boolean;
}

export default function CustomBarChart({barSize=30,xDataKey,data,dataKey,fill="#000",className,tooltip=false}:CustomBarChartProps){

    const {theme} = useTheme()

    fill = theme == "dark" ?"#fff":fill


    return (
        <ResponsiveContainer className={className}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                {tooltip && <Tooltip labelClassName={"dark:text-slate-800"} />}
                <Legend />
                <XAxis dataKey={xDataKey}  />
                <YAxis />
                <Bar dataKey={dataKey} barSize={barSize} fill={fill}/>
            </BarChart>
        </ResponsiveContainer>

    )
}