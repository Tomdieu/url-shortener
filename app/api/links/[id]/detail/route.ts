import { NextRequest,NextResponse } from "next/server";
import {getLinkChartDetail} from "@/lib/getLinkChartDetail";

export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){
    const { id } = await params;
    const short = id;
    const url = new URL(req.url);
    const {searchParams} = url

    const filterBy = searchParams.get('filterBy') as "day" | "month" | "year" || "day";
    const startDate = searchParams.get('startDate') ? new Date() : undefined;
    const endDate = searchParams.get('endDate') ? new Date() : undefined    ;



    const chartLink = await getLinkChartDetail(short,filterBy,startDate,endDate);
    return NextResponse.json(chartLink);

}