import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import APIRoutes from './presentation/routes/APIRoutes';

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: '*' }));


app.use('/api', APIRoutes);

export default app;