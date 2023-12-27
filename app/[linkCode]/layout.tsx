import React from "react"
import { getLink } from '@/lib/actions/links'
import { Metadata, ResolvingMetadata } from 'next'
import {previewLink} from "@/lib/actions/preview-link"

type Props = {
    params: { linkCode: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const linkCode = params.linkCode

    const link = await getLink(linkCode)


    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    const extractedMetaData = await previewLink(link.data?.original!)

    const {title,description,image} = extractedMetaData

    const {short,original}=link.data!
    // process.env.URL+'/icon.png'
    return {
        title: process.env.URL+"/"+linkCode,
        description:"Total Clicks : "+link.data?.clicks.length,
        openGraph: {
            images: [image,process.env.URL+'/icon.png', ...previousImages],
            description:"Total Clicks : "+link.data?.clicks.length,
            title:original,
            url:process.env.URL,
            tags:["Trix Url",original],
        },
        twitter:{
            images: [image,process.env.URL+'/icon.png', ...previousImages],
            description:"Total Clicks : "+link.data?.clicks.length,
            title:original,
        }
    }
}

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <div className={"flex flex-1 w-full h-full"}>
            {children}
        </div>
    )
}