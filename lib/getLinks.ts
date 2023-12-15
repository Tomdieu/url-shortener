"use server"
import getCurrentUser from "./getCurrentUser";
import prisma from "./prismadb";

export async function getLinks(){
    const user = await getCurrentUser();

    return prisma.link.findMany({where: {ownerId: user?.id}, include: {clicks: true}});
}