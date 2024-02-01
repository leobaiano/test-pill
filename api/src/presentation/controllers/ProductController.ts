import { Request, Response } from 'express';
import { Product } from '../../business_logic/models/ProductModel';
import ProductService from '../../business_logic/services/ProductService';

class ProductController {
    async productHandler(req: Request, res: Response) {
        try {
            const productService: ProductService = new ProductService();
            const url = req.query.url as string;
            const product: Product = await productService.getProduct(url);

            productService.sendResponse(res, product);
        } catch (error) {
            console.error('[CrawlController] -', error);
            res.status(500).json({ message: 'Error processing the request', error });
        }
    }
}

export default ProductController;