import getCurrentUser from "./getCurrentUser";
import prisma from "./prismadb";

export async function getLinks(){
    const user = await getCurrentUser();

    const links = await prisma.link.findMany({where:{
        ownerId:user?.id
    }})

    return links
}