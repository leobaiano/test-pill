import express, { Request, Response } from 'express';
import DrogasilController from '../controllers/DrogasilController';

const router = express.Router();
const drogasilController = new DrogasilController();

console.log("teste 3");

router.get('/drogasil', drogasilController.drogasilHandler.bind(drogasilController));

export default router;