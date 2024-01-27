import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/crawl', (req: Request, res: Response) => {
  // Aqui você pode adicionar a lógica para processar a solicitação, se necessário
  const data = { "teste": "teste" };
  
  // Envie o objeto JSON como resposta
  res.json(data);
});

export default router;