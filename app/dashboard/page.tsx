// "use client";
import TopShortenUrl from "@/components/Link/TopShortenUrl";
import {getAverageClickRate} from "@/lib/getAverageClickRate";
import {getChartLinkData} from "@/lib/getChartLinkData";
import getCurrentUser from "@/lib/getCurrentUser";
import {getNumberOfShortenLinks} from "@/lib/getNumberOfShortenLinks";
import {getTopShortenedUrls} from "@/lib/getTopShortenedUrls";
import {getTotalNumberOfClick} from "@/lib/getTotalNumberOfClick";
import {Link1Icon} from "@radix-ui/react-icons";
import {MousePointerClick} from "lucide-react";
import React from "react";
import {FiMousePointer} from "react-icons/fi";
import {formatNumber} from "@/lib/formatNumber";
import {formaliseDay, getChartsLinks} from "@/lib";
import CustomLineChart from "@/components/charts/CustomLineChart";

type Props = {};


const Dashboard = async (props: Props) => {
    const user = await getCurrentUser()
    const numberOfShortendLinks = await getNumberOfShortenLinks(user?.id as string);
    const topShortendUrls = await getTopShortenedUrls(user?.id as string)
    const averageClickRate = await getAverageClickRate(user?.id as string)
    const toatalNumberOfClicks = await getTotalNumberOfClick(user?.id as string)
    const chartLinkData = await getChartLinkData();

    const chartData = await getChartsLinks()


    return (
        <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between my-3">
                <h5 className="font-extrabold text-xl md:text-3xl">Dashboard</h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                <div
                    className="border dark:border-white/20 p-5 py-7 flex gap-2 flex-col cursor-pointer rounded-xl border-stone-200 bg-white text-stone-950 shadow dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50">
                    <div className="flex items-center justify-between">
                        <h5 className="font-bold text-medium">
                            Total numbers of shortened links
                        </h5>
                        <Link1Icon/>
                    </div>
                    <h5 className="font-bold text-2xl">{formatNumber(numberOfShortendLinks)}</h5>

                </div>
                <div
                    className="border dark:border-white/20 p-5 rounded-md flex gap-2 flex-col shadow-md cursor-pointer dark-theme">
                    <div className="flex items-center justify-between">
                        <h5 className="font-bold text-medium">Total number of clicks</h5>
                        <FiMousePointer/>
                    </div>
                    <h5 className="font-bold text-xl">{formatNumber(toatalNumberOfClicks)}</h5>

                </div>
                <div
                    className="border dark:border-white/20 p-5 rounded-md flex gap-2 flex-col shadow-md cursor-pointer dark-theme">
                    <div className="flex items-center justify-between">
                        <h5 className="font-bold text-medium">
                            Average click-through rate
                        </h5>
                        <MousePointerClick size={16}/>
                    </div>
                    <h5 className="font-bold text-xl">{averageClickRate.toFixed(2)} %</h5>

                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-2">
                <TopShortenUrl shortenedUrls={topShortendUrls}/>
                {chartData &&
                    (
                        <CustomLineChart tooltip={true} xDataKey={"timestamp"} data={chartData}
                                         datakey={"clicks"} fill={"#000"}
                                         className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"} />

                    )
                }

            </div>


        </div>
    );
};

export default Dashboard;
