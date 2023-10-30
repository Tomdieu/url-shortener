import { generateShortCode } from "@/lib/generateShortCode";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { validateUrl } from "@/lib/validateUrl";
import { linkSchema } from "@/schema/link.schema";
import { CreateLink } from "@/types";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if(user){
    console.log("User : "+user.name)
    const links = await prisma.link.findMany({ where: { ownerId: user?.id },include:{clicks:true }});
    return NextResponse.json(links);
  }
  return  NextResponse.json({"error":"Sorry you need to be authenticated"},{status:401})
}

export async function POST(req: NextRequest) {
  const body: CreateLink = await req.json();
  const res = linkSchema.safeParse(body);

  if (!res.success) {
    const { errors } = res.error;

    return NextResponse.json(
      { error: { message: "Invalid Request", errors } },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: { message: "User not found" } },
      { status: 404 }
    );
  }

  async function generateUniqueShort() {
    const short = generateShortCode();
    const link = await prisma.link.findFirst({ where: { short: short } });
    if (link) {
      await generateUniqueShort();
    }
    return short;
  }

  const ownerId: string = user?.id as string;
  var short = "";

  if (validateUrl(body.original)) {
    short = await generateUniqueShort();
  } else {
    return NextResponse.json(
      { error: { message: "Invalid URL" } },
      { status: 400 }
    );
  }

  // check if the short exists in the database if not generate another short

  const link = await prisma.link.create({
    data: { ...body, ownerId: ownerId, short },
  });
  return NextResponse.json(link);
}
