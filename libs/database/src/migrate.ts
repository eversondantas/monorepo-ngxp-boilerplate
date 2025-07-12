import { sequelize } from './connection';
import { Umzug, SequelizeStorage } from 'umzug';
import { resolve } from 'path';
import { logger } from '@logger/index';

export async function runMigrations(): Promise<void> {
  await sequelize.authenticate();

  const umzug = new Umzug({
    migrations: { glob: resolve(__dirname, 'migrations/*.ts') },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger,
  });

  await umzug.up();
  logger.info('Migrations executed');
}

if (require.main === module) {
  runMigrations().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
