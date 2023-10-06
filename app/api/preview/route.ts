
import { NextRequest } from "next/server";
import { parse } from "node-html-parser"

export async function GET(req: NextRequest) {

    const url = req.nextUrl.searchParams.get("url");
    
    try {
        const response = await fetch(url as string);
        const html = await response.text()
        const root = parse(html);
        const title = root.querySelector("title")?.text
        const description = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const image = root.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        return new Response(JSON.stringify({ title, description, image }))
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ error: "Error occur !" }))
    }
}