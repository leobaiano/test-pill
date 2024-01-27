import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import axios from 'axios';
import puppeteer from 'puppeteer';
import { Product } from '../../business_logic/models/CrawledData';

class CrawlController {
    //  GET simple HTML 
    protected async fetchHTML(url: string): Promise<string> {
        const response = await axios.get(url);

        return response.data;
    }

    // Get dynamic HTML
    protected async fetcDynamichHTML(url: string): Promise<string> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        const dynamicContent = await page.content();

        await browser.close();

        return dynamicContent;
    }


    // Get value from an html tag
    protected getValueFromHTMLTag(html: string, tag: string): string | null {
        const $ = cheerio.load(html);
        let content = $(tag).text();

        if (!content) {
            const fullPath = `.${tag.split(' ').join(' .')}`;
            content = $(fullPath).text();
        }

        return content || null;
    }

    // Send response
    protected sendResponse(res: Response, data: Product) {
        res.json(data);
    }
}

export default CrawlController;