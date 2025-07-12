import { Sequelize } from 'sequelize-typescript';
import { createSequelize } from './connection';
import { ormConfig } from './ormconfig';

let sequelize: Sequelize | null = null;

export async function initDatabase(uri: string = ormConfig.url): Promise<Sequelize> {
  if (!sequelize) {
    sequelize = createSequelize(uri);
    await sequelize.authenticate();
  }
  return sequelize;
}

export async function closeDatabase(): Promise<void> {
  if (sequelize) {
    await sequelize.close();
    sequelize = null;
  }
}

export function getSequelize(): Sequelize {
  if (!sequelize) {
    throw new Error('Database not initialized');
  }
  return sequelize;
}
