/* eslint-env node */
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

function assertEnvVar(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }
  return value;
}

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
    host: assertEnvVar('DB_HOST', process.env.DB_HOST),
    port: Number(assertEnvVar('DB_PORT', process.env.DB_PORT)),
    user: assertEnvVar('DB_USER', process.env.DB_USER),
    password: assertEnvVar('DB_PASSWORD', process.env.DB_PASSWORD),
    name: assertEnvVar('DB_NAME', process.env.DB_NAME),
    retry: Number(process.env.DB_RETRY || 3),
  } as DbConfig,
  app: {
    port: Number(assertEnvVar('PORT', process.env.PORT)),
    nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) || 'development',
  } as AppConfig,
  logging: {
    level: (process.env.LOG_LEVEL as LoggingConfig['level']) || 'info',
  } as LoggingConfig,
};
