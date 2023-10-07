import prisma from "@/lib/prismadb";
export const getChartLinkData = async (linkId?: number) => {
    const linksWithClicks = await prisma.link.findMany({
        include: {
            clicks: true,
        },
    });

    // Process the data to create the required format for Recharts
    const chartData = linksWithClicks.map((link) => ({
        url: link.original,
        clicks: link.clicks.length,
    }));

    return chartData;
}