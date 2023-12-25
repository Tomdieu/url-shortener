"use client"

import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@/components/ui/hover-card"
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {useQuery} from "@tanstack/react-query";
import {extractMetaData} from "@/lib/actions/preview-link";

type HoverLinkProps = {
    url:string
}

export default function HoverLink({url}:HoverLinkProps){

    const {data,isLoading,isError}=useQuery({
        queryFn: ()=>{
            return extractMetaData(url)
        },
        queryKey:["link","preview",url]
    })


    console.log("Url Data is : ",data)


    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link" className="truncate">{url}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="p-0 m-0">
                {isLoading ? (
                    <p className="p-3">Loading...</p>
                    ):(
                    <Card className="py-4">
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={data?.og.image}
                                width={270}
                                
                            />
                        </CardBody>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold truncate">{data?.og.title}</p>
                            <small className="text-default-500 truncate">{data?.og.description}</small>
                            <h4 className="font-light text-xs text truncate">{url}</h4>
                        </CardHeader>

                    </Card>
                )}
                {isError && (<p>Error</p>)}

            </HoverCardContent>
        </HoverCard>
    )
}