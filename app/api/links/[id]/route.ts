import getCurrentUser from "@/lib/getCurrentUser";
import { linkSchema } from "@/schema/link.schema";
import { NextRequest,NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  const id = params.id;
  console.log(req.ip,req.geo)
  try {
    const user = await getCurrentUser();
    const ipAddress = req.ip;
    const link = await prisma.link.findFirst({ where: { short: id } });
    // we are going to increment the link click if if exists and the owner of that url is not the one accessing it
    if (link) {

      if (!user || (user?.id !== link.ownerId)) {
  
        await prisma.click.create({ data: { linkId: link.id, ipAddress, } });
      }
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
