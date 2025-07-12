import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import { initDatabase } from './database.module';
import { resolve } from 'path';

export async function runMigrations(): Promise<void> {
  const sequelize: Sequelize = await initDatabase();

  const umzug = new Umzug({
    migrations: { glob: resolve(__dirname, 'migrations/*.ts') },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up();
}

if (require.main === module) {
  runMigrations().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
