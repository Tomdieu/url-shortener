import getCurrentUser from "@/lib/getCurrentUser";
import { linkSchema } from "@/schema/link.schema";
import { NextRequest, NextResponse, userAgent } from "next/server";
import prisma from "@/lib/prismadb";
import getGeolocation from "@/lib/actions/getGeolocation";

function extractHostIfValidURL(str:string) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  if (urlRegex.test(str)) {
    const url = new URL(str);
    return url.host;
  }

  return str;
}

export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  const id = params.id;
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);

    const deviceType = searchParams.get('deviceType')

    const link = await prisma.link.findFirst({ where: { short: id } });

    const referrer = extractHostIfValidURL(req.headers.get("Referer") || searchParams.get("Referrer") as string || 'Direct');

    const { device, os, browser } = userAgent(req)


    const ipAddress = req.headers.get('x-forwarded-for');


    const country = await getGeolocation(ipAddress!, process.env.API_INFO_TOKEN!)

    // we are going to increment the link click if if exists and the owner of that url is not the one accessing it
    if (link) {

      if (!user || (user?.id !== link.ownerId)) {

        await prisma.click.create({ data: { linkId: link.id, ipAddress, country, referrer, device:deviceType || device.type, os: os.name, browser: browser?.name } });
      }
    }else{
      return NextResponse.json({"message":`Not found`},{status:404})
    }
    return NextResponse.json(link, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;
  const user = await getCurrentUser();

  try {
    const body = await req.json();
    const res = linkSchema.safeParse(body);
    if (!res.success) {
      const { errors } = res.error;
      return NextResponse.json(
        { error: { message: "Invalid Request", errors } },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    // Get the link to see if it exists
    const link = await prisma.link.findFirst({ where: { short: id } });
    if (!link) {
      return NextResponse.json(
        { error: { message: "Link not found" } },
        { status: 404 }
      );
    }
    if (user?.id === link.ownerId) {
      const link = await prisma.link.update({
        where: { short: id },
        data: { ...body },
      });
      return NextResponse.json(link, { status: 200 });
    } else {
      return NextResponse.json(
        { error: { message: "Unauthorized" } },
        { status: 401 }
      );
    }
  } catch (error) { }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  if (!id) {
    return NextResponse.json(
      { error: { message: "Invalid Request" } },
      { status: 400 }
    );
  }
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: { message: "Unauthorized" } },
      { status: 401 }
    );
  }
  const link = await prisma.link.findFirst({ where: { short: id } });
  if (!link) {
    return NextResponse.json(
      { error: { message: "Link not found" } },
      { status: 404 }
    );
  }
  if (user?.id === link.ownerId) {
    const link = await prisma.link.delete({ where: { short: id } });
    return NextResponse.json(link, { status: 200 });
  } else {
    return NextResponse.json(
      { error: { message: "Unauthorized" } },
      { status: 401 }
    );
  }
}
