import React from 'react'
import {Metadata, ResolvingMetadata} from 'next'
import {getLink} from "@/lib/actions/links";
import {extractMetaData, previewLink} from "@/lib/actions/preview-link";
import LinkDetailChart from "@/components/Link/LinkDetailChart";
import {getLinkChartDetail} from "@/lib/getLinkChartDetail";
import UpdateUrl from "@/components/Link/UpdateUrl";
import CustomBarChart from "@/components/charts/CustomBarChart";
import DetailCard from "@/components/Link/DetailCard";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import CustomLineChart from "@/components/charts/CustomLineChart";
import HoverLink from "@/components/Link/HoverLink";

type Props = {
    params: { short: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const shortCode = params.short;
    try {
        const {success, data} = await getLink(shortCode);
        if (success && data) {
            const images = [];
            const meta_Data = await extractMetaData(data.original!)
            const metaData = JSON.parse(JSON.stringify(meta_Data, null, 3))
            // console.log((await scrapeWebsite(data.original)));

            if (metaData.og) {
                if (metaData.og.image) {
                    images.push(metaData.og.image)
                }
            }

            const previewRes = await previewLink(data.original);

            const shortUrl = process.env.URL + '/' + data?.short;
            const previousImages = (await parent).openGraph?.images || [...images];

            return {
                metadataBase: new URL(process.env.URL as string),
                title: previewRes.title ?? data.original,
                description: previewRes.description,
                icons: [{rel: "icon", url: data?.original as string}],
                openGraph: {
                    title: previewRes.title,
                    description: previewRes.description,
                    url: shortUrl,
                    siteName: 'TrixUrl',
                    images: [process.env.URL + '/logo.png', ...previousImages]
                },

            }
        }

        return {
            title: "Trix Url | Link",
            description: "Trix Url",
        };
    } catch (e) {
        return {
            title: "Trix Url | Link",
            description: "Trix Url",
        };
    }

}

const LinkDetail = async ({params, searchParams}: Props) => {
    const {short} = params;

    const link = await getLink(short)

    const dayDetail = await getLinkChartDetail(short,"day");
    const monthDetail = await getLinkChartDetail(short,"month");
    const yearDetail = await getLinkChartDetail(short,"year");


    console.log({link})



    return (
        <div className={"flex-1 w-full h-full flex flex-col space-y-2"}>
            <div className={"w-full flex flex-col gap-5"}>
                <div className="w-full mx-auto grid gap-2">
                    <h1 className="font-semibold text-3xl">Short URL Details</h1>
                    <div className="flex items-center text-sm gap-2">
                        <a className="font-medium" href={process.env.URL+"/"+short} target="_blank">
                            {/* <HoverLink url={process.env.URL+"/"+short}/> */}
                            <HoverLink url={link?.data.original}/>


                        </a>
                        <Separator className="h-5" orientation="vertical" />
                        <Badge className="font-semibold" variant="secondary">
                            {link.data?.clicks.length} Clicks
                        </Badge>
                    </div>
                </div>
                {/*<LinkDetailChart linkId={short}/>*/}
                {/*<div className={"md:max-w-[300px] md:max-h-[300px] flex"}>*/}
                {/*</div>*/}
                {/*<CustomLineChart className={"max-w-[500px] max-h-[400px]"} type={"bump"}  data={detail}  datakey={"clicks"} />*/}

                <div className={"max-w-md"}>
                    {link.data && (
                        <UpdateUrl link={link.data}/>
                    )}
                </div>

            </div>

            <div className={"grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"}>
                <DetailCard title={"Top Referrers"} description={"Clicks"} items={[{label:"google.com",value:200},{label:"twitter.com",value:150}]}/>
                <DetailCard title={"Top Locations"} description={"Clicks"} items={[{label:"United States",value:500},{label:"Germany",value:200},{label:"india",value:150}]}/>
                <DetailCard title={"Top Devices"} description={"Clicks"} items={[{label:"Desktop",value:600},{label:"Mobile",value:400},{label:"Tablet",value:200}]}/>

            </div>

            <div className={"py-3 dark-theme rounded-sm px-2 w-full grid grid-cols-1 lg:grid-cols-3 h-1/2 items-center"}>
                <div className={"h-full flex flex-col flex-1"}>
                    <h6>Day</h6>
                    <CustomBarChart tooltip className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"} data={dayDetail} barSize={30}
                                    xDataKey={"timestamp"} dataKey={"clicks"}/>
                    {/*<CustomLineChart xDataKey={"timestamp"} data={dayDetail} datakey={"clicks"} fill={"#000"} className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"} tooltip/>*/}
                </div>
                <div className={"h-full flex flex-col flex-1"}>
                    <h6>Month</h6>
                    <CustomBarChart tooltip className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"} data={monthDetail} barSize={30}
                                    xDataKey={"timestamp"} dataKey={"clicks"}/>
                    {/*<CustomLineChart xDataKey={"timestamp"} data={monthDetail} datakey={"clicks"} fill={"#000"} className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"} tooltip/>*/}

                </div>
                <div className={"h-full flex flex-col flex-1"}>
                    <h6>Year</h6>
                    <CustomBarChart tooltip className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"} data={yearDetail} barSize={30}
                                    xDataKey={"timestamp"} dataKey={"clicks"}/>
                </div>

            </div>


        </div>
    )
}

export default LinkDetail 