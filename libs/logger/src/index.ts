import pino from 'pino';
import { config } from '@config/index';

export const logger = pino({ level: config.logging.level });
