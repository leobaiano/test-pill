import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import CrawlService from './CrawlService';
import { Product } from '../../business_logic/models/CrawledData';

class DrogasilService extends CrawlService {
    
    // Get HTML
    public async fetcDynamichHTML(url: string): Promise<string> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.price-final', { timeout: 50000 });
        
        const dynamicContent = await page.content();

        await browser.close();

        return dynamicContent;
    }

    // Get price
    public getPrice(price: string | null): number {
        const matches = price ? price.match(/R\$(\d+,\d+)/) : 0;
    
        if (matches && matches[1]) {
            const numericValue = parseFloat(matches[1].replace(',', '.'));
    
            if (!isNaN(numericValue)) {
                return numericValue;
            }
        }
    
        return 0;
    }

    // Get bar code
    public getBarCode(html:string): string | null {
        const $ = cheerio.load(html)

        const content = $('th:contains("EAN")').next().find('div').text();

        return content || null;
    }

    // Get image
    public getImage(html: string): string | null {
        const $ = cheerio.load(html);
        let clearImageUrl = '';
        let encodedImageUrl = '';
        let imageUrl = '';
        
        const unprocessedImageUrl = $('.swiper-lazy').attr('src') ? $('.swiper-lazy').attr('src') : '';
        
        if (unprocessedImageUrl) {
            clearImageUrl = unprocessedImageUrl.replace("/_next/image?url=", "");
            encodedImageUrl = decodeURIComponent(clearImageUrl);
            imageUrl = encodedImageUrl.split('?')[0];
        }
    
        return imageUrl || null;
    }
}

export default DrogasilService;