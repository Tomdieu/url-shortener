import prisma from "./prismadb";
export const getAverageClickRate = async (ownerId: string) => {
    const links = await prisma.link.findMany({
      where: { ownerId },
      include: { clicks: true },
    });
  
    if (links.length === 0) {
      return 0; // Avoid division by zero when there are no links
    }
  
    const totalClicks = links.reduce((acc, link) => acc + link.clicks.length, 0);
    const totalLinks = links.length;
  
    const averageClickRate = totalClicks / totalLinks;
  
    return averageClickRate;
  };
  