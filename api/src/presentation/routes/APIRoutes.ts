import express, { Request, Response } from 'express';
import ProductController from '../controllers/ProductController';

const router = express.Router();
const productController = new ProductController();

router.get('/product', productController.productHandler.bind(ProductController));

export default router;