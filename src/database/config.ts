import { env } from '@utils/env';

const configDB = {
  DB: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASS,
  dialect: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT as number,
};

export default configDB;
