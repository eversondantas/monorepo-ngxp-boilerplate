export interface OrmConfig {
  url: string;
}

export const ormConfig: OrmConfig = {
  url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydatabase',
};
