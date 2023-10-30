"use client"

import {useQuery} from "@tanstack/react-query"
import {Skeleton} from "@/components/ui/skeleton";
import UpdateUrl from "@/components/Link/UpdateUrl";
import {Link} from "@/types";

type LinkDetailProps = {
    linkId: string
}

export default function LinkChartDetail({linkId}: LinkDetailProps) {


    const linkQuery = useQuery({
        queryFn: async () => {
            const res = await fetch(`/api/links/${linkId}`,{cache:"force-cache"});
            return (await res.json())
        },
        queryKey: ['link', linkId]
    });

    console.log(linkQuery.status)

    const linkDetailQuery = useQuery({
        queryFn: async () => {
            const res = await fetch(`/api/links/${linkId}/detail?filterBy=day`);
            return (await res.json())
        },
        queryKey: [`linkDetail`, linkId],
        enabled: linkQuery?.data?.id !== null
    });


    console.log(linkQuery.data,linkQuery?.data?.id !== undefined)
    console.log(linkDetailQuery.data)


    if (linkQuery.isLoading) {
        return <Skeleton className={"w-full h-20"}/>
    }

    // if (linkQuery.error) {
    //     return "Error"
    // }

    return (
        <div>
            <h1>
                Finished
            </h1>
            {linkQuery?.data?.id !== undefined && <UpdateUrl url={linkQuery.data as Link} />}
        </div>
    )

}