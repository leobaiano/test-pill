import { Request, Response } from 'express';
import { Product } from '../../business_logic/models/CrawledData';
import DrogasilService from '../../business_logic/services/DrogasilService';

class DrogasilController {
    protected drogasilService: DrogasilService;
    
    constructor() {
        this.drogasilService = new DrogasilService();
    }

    async drogasilHandler(req: Request, res: Response) {
        try {
            const url = req.query.url as string;
            const html = await this.drogasilService.fetcDynamichHTML(url);

            const name = this.drogasilService.getValueFromHTMLTag(html, '.product-name h1')?.replace('...', '') as string;
            const barCode = this.drogasilService.getBarCode(html) as string;
            const brand = this.drogasilService.getValueFromHTMLTag(html, '.brand') as string;
            const image = this.drogasilService.getImage(html) as string;
            const allPricesInPage = this.drogasilService.getValueFromHTMLTag(html, '.price-final');
            console.log()
            const price = this.drogasilService.getPrice(allPricesInPage);

            const product: Product = {
                url,
                name,
                barCode,
                brand,
                image,
                price
            }

            this.drogasilService.sendResponse(res, product);
        } catch (error) {
            console.error('[CrawlController] -', error);
            res.status(500).json({ message: 'Error processing the request', error });
        }
    }
}

export default DrogasilController;