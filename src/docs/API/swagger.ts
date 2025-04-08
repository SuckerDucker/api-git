import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import YAML from 'js-yaml';
import fs from 'fs';

import { env } from '@utils/env';

const isProduction = env.NODE_ENV === 'development' && env.DOCKER === 'true';
const basePath = isProduction
  ? 'build/docs/API/endpoints/'
  : 'src/docs/API/endpoints/';

const swaggerRouter = Router();

if (process.env.DOCS_ENABLED === 'true') {
  const swaggerFiles = [
    `${basePath}auth.yml`,
    `${basePath}period.yml`,
    `${basePath}admin.yml`,
    `${basePath}student.yml`,
    `${basePath}coordinator.yml`,
  ];

  const swaggerSpecs = swaggerFiles.map((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    return YAML.load(fileContent);
  });

  const combinedSpec = {
    openapi: '3.0.0',
    info: {
      title: 'eva API',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api/v1',
      },
    ],
    paths: Object.assign({}, ...swaggerSpecs.map((spec: any) => spec.paths)),
  };

  swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(combinedSpec));
} else {
  swaggerRouter.use('/docs', (_req, res) => {
    res.send('Docs are not available in production');
  });
}

export default swaggerRouter;
