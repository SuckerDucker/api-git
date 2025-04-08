import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import '@config/logs.config';
import routerAPI from '@routes/index.routes';
import routerSwagger from '@docs/API/swagger';
import './database/index';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.ORIGIN_URL_FRONT as string,
    credentials: true,
  })
);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', routerAPI);
app.use('/api/v1', routerSwagger);

app.use((_req, res, next) => {
  res.status(404).send({ message: 'Page not found' });
  next();
});

export default app;
