import express, { Request, Response } from 'express';
import CrawlController from '../controllers/CrawlController';

const router = express.Router();
const crawlController = new CrawlController();

router.get('/drogasil', crawlController.crawlHandler.bind(crawlController));

export default router;