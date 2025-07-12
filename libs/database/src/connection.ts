import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

export function createSequelize(uri: string): Sequelize {
  const sequelize = new Sequelize(uri, {
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
  });

  sequelize.addModels([User, Role]);
  return sequelize;
}
