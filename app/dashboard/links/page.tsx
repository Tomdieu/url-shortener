"use client"
import LinkTables from "@/components/Link/LinkTables";
import React from "react";
import {useQuery} from "@tanstack/react-query"
import {Input,Button} from "@nextui-org/react";
import Link from "next/link";
import {PlusIcon} from "lucide-react";
// import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";


type Props = {};

export default function Links(props: Props) {

    const {error, isPending, isFetched, data, isLoading} = useQuery({
        queryFn: async () => {
            const res = await fetch(`/api/links`);
            return (await res.json() )
        }, queryKey: [`links`]
    });




    return <div className="flex-1 flex flex-col h-full px-2 py-3">
        <h5 className="text-2xl font-bold flex py-2 items-center justify-between">
            <div className={"flex gap-5 items-center"}>
                <h1>Links</h1>
                <div>
                    <input type={"search"} placeholder={"search..."} className={"border border-black px-1.5 py-2 focus:ring-indigo-500 focus:border-none border-none  block w-full shadow-sm sm:text-sm dark:border-gray-300 rounded-md"}/>
                </div>
            </div>
            <Link href={"/dashboard/shorten"}>
                <Button isIconOnly={true} className={"rounded-md"} title={"Add link"}><PlusIcon/></Button>
            </Link>
        </h5>
        {isLoading && <div>
        <Skeleton className={"h-5 w-full"}/>
            <Skeleton className={"h-24 w-full"}/>

        </div>}
        {isFetched && !data && <div>You don&apos;t have links</div>}
        {data && <LinkTables links={data}/>}
    </div>;
};

