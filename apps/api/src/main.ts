import { createApp } from './server';
import { initDatabase } from '@database/init';
import { logger } from '@logger/index';
import { config } from '@config/index';

export async function bootstrap() {
  try {
    await initDatabase();
    const app = createApp();
    const port = config.app.port;
    app.listen(port, () => {
      logger.info(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
}

if (require.main === module) {
  bootstrap();
}
