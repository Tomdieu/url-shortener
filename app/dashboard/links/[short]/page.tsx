// "use client"
import React from 'react'
import {getLinkFromId} from "@/lib/getLinkFromId";
import {Metadata, ResolvingMetadata} from 'next'
import {Url} from "@/types";
import LinkChartDetail from "@/components/Link/LinkDetail";
import {useParams} from "next/navigation";

type Props = {
    params: { short: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const shortCode = params.short;
    try {
        const res = await fetch(`${process.env.URL}/api/links/${shortCode}/`);
        if(res.status===200){
            const linkDetail = await res.json()
            const urlPreviewDataResponse = await fetch(`${process.env.URL}/api/preview?url=${linkDetail?.original}`);
            const urlPreviewData = (await urlPreviewDataResponse.json()) as Url;
            const previousImages = (await parent).openGraph?.images || [];

            const shortUrl = process.env.URL + '/' + linkDetail?.short;

            return {
                metadataBase: new URL(process.env.URL as string),
                title: urlPreviewData.title,
                description: urlPreviewData.description,
                icons: [{rel: "icon", url: linkDetail?.original as string}],
                openGraph: {
                    title: urlPreviewData.title,
                    description: urlPreviewData.description,
                    url: shortUrl,
                    siteName: 'TrixUrl',
                    images: [process.env.URL + '/logo.png', ...previousImages]
                },
                // alternates: {
                //   canonical: '/',
                // },
            }
        }   
        return {};
    }
    catch (e) {
        return {};
    }

}

const LinkDetail = ({params,searchParams}: Props) => {
    const {short} = params;
    console.log("id is : ", short)
    console.log(params,searchParams)

    if(short==="react_devtools_backend_compact.js.map" || short==='react_devtools_backend_compact.js.map'){
        return null
    }


    return (
        <div className={"flex-1 w-full h-full"}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-1"}>
                <div>
                    {/*{linkDetail && (*/}
                    {/*    <UpdateUrl url={linkDetail}  baseUrl={process.env.URL}/>*/}
                    {/*)}*/}

                </div>

                <LinkChartDetail linkId={short}/>
                {/*<div>*/}
                {/*  {data ? (*/}
                {/*      <LinkChart type="line" clickDatas={data || []} />*/}
                {/*  ):(*/}
                {/*      <div className={""}>*/}
                {/*        <h1 className={'font-bold text-3xl'}>No Analytics for this link</h1>*/}
                {/*      </div>*/}
                {/*  )}*/}
                {/*</div>*/}
                {/*<div className={"flex-grow flex flex-col gap-1  p-3"}>*/}
                {/*  <h5 className={"font-bold text-2xl my-2"}>QrCode</h5>*/}
                {/*  <div className={"flex-1"}>*/}
                {/*    <Qrcode url={`${process.env.URL}/${linkDetail?.short}`} className={"min-h-[300px] min-w-[300px]"}/>*/}
                {/*  </div>*/}
                {/*</div>*/}
            </div>

        </div>
    )
}

export default LinkDetail 