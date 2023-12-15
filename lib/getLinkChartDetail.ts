"use server"
import prisma from "@/lib/prismadb";
import { Click } from "@prisma/client";

interface ClickData {
  timestamp: string;
  clicks: number;
}

export const getLinkChartDetail = async (
  short: string,
  filterBy: "day" | "month" | "year"= "day",
  startDate?: Date,
  endDate?: Date
) => {  
  const link = await prisma.link.findUnique({
    where: { short },
    include: {
      clicks: {
        orderBy: { timestamp: 'asc' },
        where: {
          timestamp: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    },
  });

  if (link) {
    const clickData: ClickData[] = link.clicks.reduce((acc: ClickData[], click: Click) => {
      let timestamp: string;
      if (filterBy === "day") {
        timestamp = new Date(click.timestamp).toDateString();
      } else if (filterBy === "month") {
        timestamp = new Date(click.timestamp).toLocaleString('default', { month: 'long' });
      } else if (filterBy === "year") {
        timestamp = new Date(click.timestamp).getFullYear().toString();
      } else {
        timestamp = click.timestamp.toISOString().slice(0, 10);
      }

      const existingData = acc.find((data) => data.timestamp === timestamp);

      if (existingData) {
        existingData.clicks++;
      } else {
        acc.push({
          timestamp,
          clicks: 1,
        });
      }

      return acc;
    }, []);

    return clickData;
  }

  return [];
};