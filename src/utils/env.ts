import * as dotenv from 'dotenv';

function loadEnv(envFileName: string) {
  const result = dotenv.config({ path: envFileName });

  if (result.error) {
    throw result.error;
  }

  return process.env;
}

const envFileName = `.env.${process.env.NODE_ENV ?? 'production'}`;
const loadedEnv = loadEnv(envFileName);

export const env = {
  PORT: loadedEnv.PORT ?? 5000,
  NODE_ENV: process.env.NODE_ENV ?? 'production',
  DOCS_ENABLED: loadedEnv.DOCS_ENABLE ?? 'false',
  AUTH: loadedEnv.AUTH ?? 'enabled',
  DB_HOST: loadedEnv.DB_HOST ?? 'localhost',
  DB_PORT: loadedEnv.DB_PORT ?? 3306,
  DB_NAME: loadedEnv.DB_NAME ?? 'database',
  DB_USER: loadedEnv.DB_USER ?? 'root',
  DB_PASS: loadedEnv.DB_PASS ?? 'root',
  JWT_KEY_UPQROO: loadedEnv.JWT_KEY_UPQROO ?? 'secret',
  ORIGIN_URL_FRONT: loadedEnv.ORIGIN_URL_FRONT ?? 'http://localhost:5173',
  TOKEN_EXPIRATION: loadedEnv.TOKEN_EXPIRATION_TIME ?? '1h',
  DOCKER: process.env.DOCKER ?? false,
};
