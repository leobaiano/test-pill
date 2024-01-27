import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import CrawlController from './CrawlController';
import { Product } from '../../business_logic/models/CrawledData';

class DrogasilController extends CrawlController{
    async drogasilHandler(req: Request, res: Response) {
        try {
            const url = req.query.url as string;
            const html = await this.fetcDynamichHTML(url);

            const name = this.getValueFromHTMLTag(html, '.product-name h1')?.replace('...', '') as string;
            const barCode = this.getBarCode(html) as string;
            const brand = this.getValueFromHTMLTag(html, '.brand') as string;
            const image = this.getImage(html) as string;
            const allPricesInPage = this.getValueFromHTMLTag(html, '.price-final');
            console.log()
            const price = this.getPrice(allPricesInPage);

            const product: Product =  {
                    url,
                    name,
                    barCode,
                    brand,
                    image,
                    price
                }

            this.sendResponse(res, product);
        } catch (error) {
            console.error('[CrawlController] -', error);
            res.status(500).json({ message: 'Error processing the request', error });
        }
    }

    // Get HTML
    protected async fetcDynamichHTML(url: string): Promise<string> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.price-final', { timeout: 50000 });
        
        const dynamicContent = await page.content();

        await browser.close();

        return dynamicContent;
    }

    // Get price
    private getPrice(price: string | null): number {
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
    private getBarCode(html:string): string | null {
        const $ = cheerio.load(html)

        const content = $('th:contains("EAN")').next().find('div').text();

        return content || null;
    }

    // Get image
    private getImage(html: string): string | null {
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

export default DrogasilController;