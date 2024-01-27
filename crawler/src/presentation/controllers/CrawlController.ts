import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

class CrawlController {
    async crawlHandler(req: Request, res: Response) {
        try {
            const url = req.query.url as string;
            const html = await this.fetchHTML(url);

            const name = this.getValueFromHTMLTag(html, '.product-name h1')?.replace('...', '');
            const barCode = this.getBarCode(html);
            const brand = this.getValueFromHTMLTag(html, '.brand');
            const image = this.getImage(html);
            const allPricesInPage = this.getValueFromHTMLTag(html, '.price-final');
            const price = this.getPrice(allPricesInPage);

            const product = {
                data: {
                    url,
                    name,
                    barCode,
                    brand,
                    image,
                    price
                }
            }

            this.sendResponse(res, product);
        } catch (error) {
            console.error('[CrawlController] -', error);
            res.status(500).json({ message: 'Error processing the request', error });
        }
    }

    // Get HTML
    private async fetchHTML(url: string): Promise<string> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.price-final', { timeout: 50000 });
        
        const dynamicContent = await page.content();

        await browser.close();

        return dynamicContent;
    }

    // GET HML
    // private async fetchHTML(url: string): Promise<string> {
    //     const response = await axios.get(url);

    //     return response.data;
    // }


    // Get value from an html tag
    private getValueFromHTMLTag(html: string, tag: string): string | null {
        const $ = cheerio.load(html);
        let content = $(tag).text();

        if (!content) {
            const fullPath = `.${tag.split(' ').join(' .')}`;
            content = $(fullPath).text();
        }

        return content || null;
    }

    // Get price
    private getPrice(price: string | null): Number {
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

        console.log(imageUrl);
    
        return imageUrl || null;
    }

    // Send response
    private sendResponse(res: Response, data: object) {
        res.json(data);
    }
}

export default CrawlController;