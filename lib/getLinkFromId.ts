import prisma from "@/lib/prismadb";

export async function getLinksFromId(id:number){

    return (await prisma.link.findUnique({where: {id}}));
}