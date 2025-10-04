import { config } from '@config/index';
import { initDatabase } from '@database/init';
import { logger } from '@logger/index';
import { createApp } from './server';

export async function bootstrap() {
  try {
    logger.info('Initializing database...');
    await initDatabase();
    logger.info('Database initialized successfully');
  } catch (err) {
    logger.error({ err }, 'Database initialization failed, continuing without full DB features');
  }

  const app = createApp();
  const port = config.app.port;

  app.listen(port, () => {
    logger.info(`🚀 Integrated API Server running on http://localhost:${port}`);
    logger.info(`📋 Health check: http://localhost:${port}/health`);
    logger.info(`👋 Hello endpoint: http://localhost:${port}/hello`);
    logger.info(`👥 Users CRUD: http://localhost:${port}/users`);
    logger.info(`🗄️ Database: PostgreSQL with Sequelize ORM`);
  });
}

void bootstrap();
