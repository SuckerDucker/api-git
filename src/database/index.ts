import { Sequelize } from 'sequelize';
import configDB from './config';
import { env } from '@utils/env';

const sequelize = new Sequelize(
  configDB.DB,
  configDB.username,
  configDB.password,
  {
    host: configDB.host,
    port: configDB.port,
    dialect: 'mysql',
    logging: env.NODE_ENV === 'development',
  }
);

sequelize
  .authenticate()
  .then(() => {
    if (env.NODE_ENV === 'development') {
      console.log('Connection has been established successfully.');
    }
  })
  .catch((e) => {
    console.error('Unable to connect to the database: ', e.message);
  });

export default sequelize;
