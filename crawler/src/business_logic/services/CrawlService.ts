import { Response } from 'express';
import * as cheerio from 'cheerio';
import axios from 'axios';
import puppeteer from 'puppeteer';
import { Product } from '../../business_logic/models/CrawledData';

class CrawlService {
    //  GET simple HTML 
    public async fetchHTML(url: string): Promise<string> {
        const response = await axios.get(url);

        return response.data;
    }

    // Get dynamic HTML
    public async fetcDynamichHTML(url: string): Promise<string> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        const dynamicContent = await page.content();

        await browser.close();

        return dynamicContent;
    }


    // Get value from an html tag
    public getValueFromHTMLTag(html: string, tag: string): string | null {
        const $ = cheerio.load(html);
        let content = $(tag).text();

        if (!content) {
            const fullPath = `.${tag.split(' ').join(' .')}`;
            content = $(fullPath).text();
        }

        return content || null;
    }

    // Send response
    public sendResponse(res: Response, product: Product) {
        res.json( {data: product } );
    }
}

export default CrawlService;