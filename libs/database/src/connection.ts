import { Sequelize } from 'sequelize-typescript';
import * as Entities from './entities';
import { config } from '@config/index';

/** Sequelize instance configured for Postgres. */
export const sequelize = new Sequelize({
  database: config.db.name,
  username: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  retry: { max: config.db.retry },
});

sequelize.addModels(Object.values(Entities));


/** Close the database connection. */
export async function closeDatabase(): Promise<void> {
  await sequelize.close();
}
