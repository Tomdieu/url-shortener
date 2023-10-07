import prisma from "./prismadb";
export const getNumberOfShortenLinks = async (ownerId: string) => {
    const linksCount = await prisma.link.count({ where: { ownerId } });
    return linksCount;
  }
  