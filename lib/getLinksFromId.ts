import prisma from "@/lib/prismadb";

export async function getLinksFromId(id:number){

    const link = await prisma.link.findUnique({where:{id}});

    return link;
}