"use server"

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/getCurrentUser";
import {linkSchema, LinkType} from "@/schema/link.schema";
import {generateShortCode} from "@/lib/generateShortCode";

export async function getLink(linkCode: string) {
    try {
        const link = await prisma.link.findFirst({where: {short: linkCode},include:{clicks:true}});
        if(!link){
            return {success: false, message: "Link Not Found"};
        }
        return {success: true, data: link, message: ""};
    } catch (e: any) {
        return {success: false, message: "Link Not Found"};
    }
}

async function generateUniqueShort() {
    const short = generateShortCode();
    const link = await prisma.link.findFirst({where: {short: short}});
    if (link) {
        await generateUniqueShort();
    }
    return short;
}

export async function create(data: LinkType) {
    const res = linkSchema.safeParse(data);
    if (!res.success) {
        return {sucess: false,data:null, message: "Please provide the url in the original key object"}
    }
    const user = await getCurrentUser();

    if (!user) {
        return {success: false,data:null, message: "Please you should be logged in"}
    }


    const short = await generateUniqueShort();
    const ownerId = user.id;


    const link = await prisma.link.create({
        data: {
            original: res.data.original,
            ownerId: ownerId,
            short: short,
        }
    })


    return {success: true, message: "Link Created", data: link}
}

export async function update(linkCode: string, data: LinkType) {
    try {
        const link = await prisma.link.findFirst({where: {short: linkCode}})
        const user = await getCurrentUser();
        const res = linkSchema.safeParse(data)
        if (!res.success) {
            return {success:false,message:`Expected a valid url but ${data.original} found!`};
        }
        if (!link) {
            return {success:false,message:"Link not found"}
        }
        if (!user) {
            return {success:false,message:"User Not Authenticated"}
        }
        if (link && user) {
            if (user?.id === link.id.toString()) {
                const newLink = await prisma.link.update({
                    where: {short: linkCode},
                    data: {
                        original: res.data.original
                    }
                })
                return {success: true, data: newLink};

            }
        }
    } catch (e) {
        return {success:false,message:"An Error Occur"}
    }
}