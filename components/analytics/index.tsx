"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useQuery} from "@tanstack/react-query";
import getCurrentUser from "@/lib/getCurrentUser";
import React, {useEffect, useState} from "react";
import {getAllMonthsAnalyticsByYear} from "@/lib";
import CustomLineChart from "@/components/charts/CustomLineChart";

function getYearsBetween(startYear: number, endYear: number) {
    const years: number[] = [];

    // Ensure startYear is less than or equal to endYear
    if (startYear > endYear) {
        [startYear, endYear] = [endYear, startYear];
    }

    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    return years;
}

export default function Analytics() {
    const {data} = useQuery({
        queryKey: ['user'], queryFn: async () => {
            return getCurrentUser()
        }
    })
    const [year, setYear] = useState<number>((new Date()).getFullYear())
    const [listYear, setListYear] = useState<number[]>([])

    useEffect(() => {
        if (data) {
            const userJoinedOn = data.createdAt
            const userJoinedYear = userJoinedOn.getFullYear()

            const currentYear = (new Date()).getFullYear()

            setListYear(getYearsBetween(userJoinedYear, currentYear))

        }
    }, [data])

    const {data:analyticsData,isLoading,refetch} = useQuery({
        queryKey:['analytics',year],
        queryFn:async ()=>{
            return getAllMonthsAnalyticsByYear(year)
        },
        enabled:data != null,


    })

    useEffect(() => {
        refetch().then(r => {} );
    }, [year, refetch]);


    return (
        <div className={"flex gap-3 flex-col w-full border p-2 rounded-md"}>
            <div className={"w-full justify-end items-stretch flex"}>
                {year && <Select onValueChange={(value) => setYear(parseInt(value))} value={year.toString()}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a year"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Year</SelectLabel>
                            {listYear.map((year) => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>}

            </div>
            <div className={"flex flex-col gap-2 w-full h-[500px]"}>

                {!isLoading && (
                    <CustomLineChart type={"monotone"} tooltip={true} xDataKey={"timestamp"} data={analyticsData}
                                     datakey={"clicks"} fill={"#000"}
                                     className={"flex-1 h-full"} />
                )}
            </div>
        </div>
    )
}