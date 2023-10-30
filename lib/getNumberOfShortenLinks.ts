import prisma from "./prismadb";

export const getNumberOfShortenLinks = async (ownerId: string) => {
    return (await prisma.link.count({where: {ownerId}}));
  }
  