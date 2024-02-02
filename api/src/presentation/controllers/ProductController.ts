import { Request, Response } from 'express';
import { Product } from '../../business_logic/models/ProductModel';
import ProductService from '../../business_logic/services/ProductService';

class ProductController {
    async productHandler(req: Request, res: Response) {
        try {
            const productService: ProductService = new ProductService();
            const url = req.query.url as string;

            // Verifica se recebeu uma URL
            if (!url) {
                return res.status(500).json({ message: 'É preciso informar a URL.' });
            }

            // Verifica se o dominio é permitido
            if (!productService.isDomainAllowed(url)) {
                return res.status(500).json({ message: 'Não é permitido consultar informações no dominio informado.' });
            }

            const product: Product = await productService.getProduct(url);

            productService.sendResponse(res, product);
        } catch (error) {
            console.error('[CrawlController] -', error);
            res.status(500).json({ message: 'Error processing the request', error });
        }
    }
}

export default ProductController;