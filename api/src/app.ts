import express from 'express';
import bodyParser from 'body-parser';
import APIRoutes from './presentation/routes/APIRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/api', APIRoutes);

export default app;