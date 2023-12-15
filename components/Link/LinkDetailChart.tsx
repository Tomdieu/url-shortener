"use client"

import {useQuery} from "@tanstack/react-query";
import {getLinkChartData} from "@/lib/getChartLinkData";
import {cn} from "@/lib/utils";

type LinkDetailProps = {
    linkId: string;
    className?: string;
}

export default function LinkDetailChart({linkId, className}: LinkDetailProps) {

    const {isLoading, isError, data, isFetched} = useQuery({
        queryKey: ["link", linkId],
        queryFn: async () => {
            return await getLinkChartData(linkId)
        }
    })


    return (
        <div
            className={cn("py-3 rounded-md w-full flex flex-col items-center border-stone-200 text-stone-950 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50", className)}>
            {isLoading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className={"flex-1 flex flex-col items-center"}>
                    <h1 className={"text-left text-xl font-medium font-poppins"}>Trix Url Details</h1>
                    {data && <div className={"flex items-center p-5 rounded-md flex-col"}><span className={"text-3xl"}>Total Clicks </span>
                        <span className={"text-xl"}>{data.totalClicks}</span></div>}

                </div>
            )}
        </div>
    )

}