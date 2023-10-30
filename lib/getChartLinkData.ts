import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/getCurrentUser";

export const getChartLinkData = async (linkId?: number) => {
    const user = await getCurrentUser();
    if (user) {


        // @ts-ignore
        const linksWithClicks = await prisma.link.findMany({
            where: {
                ownerId: user.id
            },
            include: {
                clicks: true,
            },
        });

        // Process the data to create the required format for Recharts
        return linksWithClicks.map((link) => ({
            url: link.original,
            clicks: link.clicks.length,
        }));
    }
    return null;
}