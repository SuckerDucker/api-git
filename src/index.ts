import listEndpoints from 'express-list-endpoints';
import Table from 'cli-table';

import app from './app';
import { env } from '@utils/env';

app.listen(env.PORT, () => {
  if (env.NODE_ENV === 'development') {
    const table = new Table({
      head: ['Method', 'Path'],
      style: {
        head: ['cyan'],
        compact: true,
        border: ['grey'],
      },
    });

    console.log('Available Endpoints');

    listEndpoints(app).forEach((endpoint) => {
      endpoint.methods.forEach((method) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        table.push([method, `http://localhost:${env.PORT}${endpoint.path}`]);
      });
    });

    console.log(table.toString());
    console.log(
      `\nDocs, Swagger running on http://localhost:${env.PORT}/api/v1/docs 🚀📒`
    );
  }
  console.log(`\nServer running on http://localhost:${env.PORT} 🚀\n`);
});
