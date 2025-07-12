import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  retry: number;
}

interface AppConfig {
  port: number;
  nodeEnv: 'development' | 'production' | 'test';
}

interface LoggingConfig {
  level: 'info' | 'debug' | 'warn' | 'error';
}

export const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'app',
    retry: Number(process.env.DB_RETRY || 3),
  } as DbConfig,
  app: {
    port: Number(process.env.PORT || 3000),
    nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) || 'development',
  } as AppConfig,
  logging: {
    level: (process.env.LOG_LEVEL as LoggingConfig['level']) || 'info',
  } as LoggingConfig,
};
