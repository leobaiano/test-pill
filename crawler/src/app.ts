import express from 'express';
import bodyParser from 'body-parser';
import CrawlRoutes from './presentation/routes/CrawlRoutes';

const app = express();

app.use(bodyParser.json());

// Roteamento
app.use('/api', CrawlRoutes);

export default app;