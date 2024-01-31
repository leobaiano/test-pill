import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import CrawlService from './CrawlService';
import { Product } from '../../business_logic/models/CrawledData';
import ProductRepository from '../../data_access/repositories/ProductRepository';

class DrogasilService extends CrawlService {

    public async getProduct(url: string): Promise<Product | null> {
        let product: Product;

        try {
            const databaseResult = await this.fetchDataFromDatabase(url);

            if (databaseResult) {
                product = databaseResult;
            } else {
                product = await this.fetcDynamichHTML(url);

                await this.addProductToDatabase(product);
            }

            return product;

        } catch (error) {
            console.error('[CrawlService] Error fetching data from database:', error);
            throw error;
        }
    }

    public async fetchDataFromDatabase(url: string): Promise<Product | null> {
        try {
            const product = await ProductRepository.findOne({ where: { url } });

            return product ? product.toJSON() as Product : null;
        } catch (error) {
            console.error('[CrawlService] Error fetching data from database:', error);
            throw error;
        }
    }

    public async fetcDynamichHTML(url: string): Promise<Product> {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.CHROME_BIN,
            args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']
        });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.price-final', { timeout: 50000 });

        const dynamicContent = await page.content();

        const name = this.getValueFromHTMLTag(dynamicContent, '.product-name h1')?.replace('...', '') as string;
        const barCode = this.getBarCode(dynamicContent) as string;
        const brand = this.getValueFromHTMLTag(dynamicContent, '.brand') as string;
        const image = this.getImage(dynamicContent) as string;
        const allPricesInPage = this.getValueFromHTMLTag(dynamicContent, '.price-final');
        const price = this.getPrice(allPricesInPage);

        const product: Product = {
            url,
            name,
            barCode,
            brand,
            image,
            price
        }

        await browser.close();

        return product;
    }

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

    public getBarCode(html: string): string | null {
        const $ = cheerio.load(html)

        const content = $('th:contains("EAN")').next().find('div').text();

        return content || null;
    }

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

    public async addProductToDatabase(product: Product): Promise<void> {
        try {
            const productAttributes = {
                url: product.url,
                name: product.name,
                barcode: product.barCode,
                image: product.image,
                price: product.price,
                status: 1
            }
            await ProductRepository.create(productAttributes);
        } catch (error) {
            console.error('[CrawlService] Error adding product to database:', error);
            throw error;
        }
    }
}

export default DrogasilService;