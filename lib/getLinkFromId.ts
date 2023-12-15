"use server"
import prisma from "@/lib/prismadb";

export async function getLinkFromId(id:number){

    return (await  prisma.link.findFirst({where: {id}}));
}