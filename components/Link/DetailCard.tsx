import { CardDescription, CardHeader, CardContent, Card, CardTitle } from "@/components/ui/card"
import {formatNumber} from "@/lib/formatNumber";

type Items = {
    label:string;
    value:number;
}

type DetailCardProps = {
    title:string;
    description:string;
    items:Items[]
}

export default function DetailCard({title,description,items}:DetailCardProps){
    return (
        <Card className="relative overflow-hidden rounded-sm">
            <CardHeader className="flex flex-row items-center border-b">
                <CardTitle>{title}</CardTitle>
                <CardDescription className="ml-auto">{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm p-6">
                {items.map(({value,label})=>(
                    <div className="flex items-center" key={label}>
                        <div>{label}</div>
                        <div className="font-semibold ml-auto">{formatNumber(value)}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}