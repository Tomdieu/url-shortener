"use client"
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";


type LinkCard = {
    image:string;
    title:string;
    description:string;
    url:string
}

export default function LinkCard({image,title,description,url}:LinkCard){

    return (
        <Card className="py-4 flex-1">
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={image}
                                width={270}
                                
                            />
                        </CardBody>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold truncate">{title}</p>
                            <small className="text-default-500 truncate">{description}</small>
                            <h4 className="font-light text-xs text truncate">{url}</h4>
                        </CardHeader>

                    </Card>
    )
}