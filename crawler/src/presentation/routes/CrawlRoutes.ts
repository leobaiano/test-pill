import express, { Request, Response } from 'express';
import CrawlController from '../controllers/CrawlController';
import DrogasilController from '../controllers/DrogasilController';

const router = express.Router();
const drogasilController = new DrogasilController();

router.get('/drogasil', drogasilController.drogasilHandler.bind(drogasilController));

export default router;