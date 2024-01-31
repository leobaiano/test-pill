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
            const product: Product = await this.drogasilService.getProduct(url);

            this.drogasilService.sendResponse(res, product);
        } catch (error) {
            console.error('[CrawlController] -', error);
            res.status(500).json({ message: 'Error processing the request', error });
        }
    }
}

export default DrogasilController;