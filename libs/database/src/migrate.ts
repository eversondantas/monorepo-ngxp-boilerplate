import { sequelize } from './connection';
import { Umzug, SequelizeStorage } from 'umzug';
import { resolve } from 'path';
import { logger } from '@logger/index';

export async function runMigrations(): Promise<void> {
  await sequelize.authenticate();

  const umzug = new Umzug({
    migrations: { glob: resolve(process.cwd(), 'libs/database/src/migrations/*.ts') },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger,
  });

  await umzug.up();
  logger.info('Migrations executed');
}
