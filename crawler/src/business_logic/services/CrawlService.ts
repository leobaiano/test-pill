import { Response } from 'express';
import * as cheerio from 'cheerio';
import axios from 'axios';
import puppeteer from 'puppeteer';
import { Product } from '../../business_logic/models/CrawledData';
import ProductRepository from '../../data_access/repositories/ProductRepository';

class CrawlService {
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
        res.json({ data: product });
    }
}

export default CrawlService;