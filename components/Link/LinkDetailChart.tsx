"use client"

import {useQuery} from "@tanstack/react-query";
import {cn} from "@/lib/utils";
import {extractMetaData} from "@/lib/actions/preview-link";
import {getLink} from "@/lib/actions/links";
import LinkCard from "@/components/Link/LinkCard";

type LinkDetailProps = {
    linkId: string;
    className?: string;
}

export default function LinkDetailChart({linkId, className}: LinkDetailProps) {

    const {data:linkData} = useQuery({
        queryKey: ["link", linkId], queryFn: async () => {
            return getLink(linkId)
        }
    })



    const {data, isLoading, isError} = useQuery({
        queryFn: () => {
            return extractMetaData(linkData?.data?.original!)
        },
        queryKey: ["link", "preview", linkData?.data?.original],
        enabled:linkData !== undefined
    })
    if(!linkData?.success) return null;



    return (
        <div
            className={cn("py-3 rounded-md w-full flex flex-col items-center border-stone-200 text-stone-950 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50", className)}>
            {isLoading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className={"flex-1 flex flex-col items-center"}>
                    {data && (
                        <LinkCard url={linkData?.data?.original!} title={data.meta.title!} image={data.og.image!} description={data.meta.description!} />

                    )}
                </div>
            )}
        </div>
    )

}