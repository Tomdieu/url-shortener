import prisma from "./prismadb";
export const getTotalNumberOfClick = async (ownerId: string) => {
    const links = await prisma.link.findMany({
      where: { ownerId },
      include: { clicks: true },
    });
  
    const totalClick = links.reduce((acc, link) => acc + link.clicks.length, 0);
    return totalClick;
  }
  