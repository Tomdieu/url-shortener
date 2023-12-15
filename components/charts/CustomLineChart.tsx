"use client"
import {LineChart, Line, ResponsiveContainer, CartesianGrid, Tooltip, Legend, XAxis, YAxis} from 'recharts';
import {CurveType} from "recharts/types/shape/Curve";
import {DataKey} from "recharts/types/util/types";
import {useTheme} from "next-themes";

type CustomLineChartProps = {
    data:any[];
    className?:string,
    type?:CurveType;
    datakey:DataKey<any>;
    fill?:string;
    tooltip?:boolean;
    xDataKey:DataKey<any>;

}

export default function CustomLineChart({data,className,type="bump",xDataKey,tooltip=false,datakey,fill="#8884d8"}:CustomLineChartProps){
    const {theme} = useTheme()

    fill = theme == "dark" ?"#fff":fill
return (
    <ResponsiveContainer className={className}>
        <LineChart data={data}>
            {tooltip && (
                <Tooltip />

            )}
            <Legend />
            <XAxis dataKey={xDataKey}/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3" />
            <Line type={type} dataKey={datakey} stroke={fill} />
        </LineChart>
    </ResponsiveContainer>
)
}