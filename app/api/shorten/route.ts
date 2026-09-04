import { generateShortCode } from "@/lib/generateShortCode";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { validateUrl } from "@/lib/validateUrl";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url } = body;

  if (!url || typeof url !== "string") {
    return NextResponse.json(
      { error: "URL is required" },
      { status: 400 }
    );
  }

  const trimmedUrl = url.trim();

  if (!validateUrl(trimmedUrl)) {
    return NextResponse.json(
      { error: "Invalid URL" },
      { status: 400 }
    );
  }

  async function generateUniqueShort(): Promise<string> {
    const short = generateShortCode();
    const existing = await prisma.link.findFirst({ where: { short } });
    if (existing) {
      return generateUniqueShort();
    }
    return short;
  }

  const short = await generateUniqueShort();

  const user = await getCurrentUser();

  const link = await prisma.link.create({
    data: {
      original: trimmedUrl,
      short,
      ownerId: user?.id ?? null,
    },
  });

  const shortUrl = `${req.nextUrl.origin}/${link.short}`;

  return NextResponse.json({ shortUrl, short: link.short });
}
