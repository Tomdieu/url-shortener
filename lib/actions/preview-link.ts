"use server"

import { parse } from "node-html-parser"

import {parser as meta_parser} from "html-metadata-parser"
import axios from "axios";
import * as cheerio from 'cheerio';

export async function previewLink(url:string){
    try {
        const response = await fetch(url);
        const html = await response.text()
        const root = parse(html);
        const title = root.querySelector("title")?.text
        const description = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const image = root.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        return {title, description, image }
    }
    catch (e) {
        throw new Error("Something went wrong");
    }
}

export async function extractMetaData(url:string){
    return await meta_parser(url);
}

interface ScrapedData {
    title?: string;
    description?: string;
    ogImage?: string;

}
export async function scrapeWebsite(url:string){
    try{
        const {data} = await axios.get(url);

        const $ = cheerio.load(data);

        const scrapedData: ScrapedData = {};

        const title = $('title').text().trim();

        if (title) {
            scrapedData.title = title;
        }

        const description = $('meta[name="description"]').attr('content');

        if (description) {
            scrapedData.description = description;
        }

        const ogImage = $('meta[property^="og:image"]').attr('content');

        if (ogImage) {
            scrapedData.ogImage = ogImage;
        }

        return scrapedData;


    }catch (error:any){
        console.error('Error fetching or parsing the HTML:', error.message);
        throw error;
    }
}