import React from "react"
import { getLink } from '@/lib/actions/links'
import { Metadata, ResolvingMetadata } from 'next'
import {previewLink} from "@/lib/actions/preview-link"

type Props = {
    params: Promise<{ linkCode: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { linkCode } = await params

    const link = await getLink(linkCode)

    if (!link.success || !link.data) {
        return {
            title: "Trix URL | Link",
            description: "Trix URL",
        }
    }

    const previousImages = (await parent).openGraph?.images || []

    let title = link.data.original
    let description = `${link.data.clicks.length} clicks`
    let image: string | null = null

    try {
        const extractedMetaData = await Promise.race([
            previewLink(link.data.original!),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000)),
        ])
        title = extractedMetaData.title || link.data.original
        description = extractedMetaData.description || description
        image = extractedMetaData.image
    } catch {
        // Preview fetch slow or failed — use fallback metadata
    }

    return {
        title,
        description,
        openGraph: {
            images: [image || process.env.URL + '/icon.png'],
            description,
            title,
            url: process.env.URL,
        },
        twitter: {
            images: [image || process.env.URL + '/icon.png'],
            description,
            title,
        },
    }
}

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <div className={"flex flex-1 w-full h-full"}>
            {children}
        </div>
    )
}