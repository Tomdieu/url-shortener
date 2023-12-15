"use server"
import prisma from "./prismadb";

export const getTopShortenedUrls = async (ownerId: string, limit = 5) => {
    const links = await prisma.link.findMany({
      where: { ownerId },
      include: { clicks: true },
      take: limit, // Limit the number of results to 5
    });
  
    // Sort links by the number of clicks in descending order
    links.sort((a, b) => b.clicks.length - a.clicks.length);
  
    // Extract the URLs from the top 5 links
    return links.slice(0, limit).filter((link) => link.clicks.length >= 1);
  };
  