import { sequelize } from './connection';
import { Umzug, SequelizeStorage } from 'umzug';
import { logger } from '@logger/index';
import { resolve } from 'path';

/**
 * Initialize database connection and apply migrations.
 */
export async function initDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    const umzug = new Umzug({
      migrations: { glob: resolve(__dirname, 'migrations/*.ts') },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger,
    });
    await umzug.up();
    logger.info('Database connected and migrations executed');
  } catch (err) {
    logger.error({ err }, 'Database initialization failed');
    throw err;
  }
}
