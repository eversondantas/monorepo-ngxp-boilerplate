import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';
import { logger } from '@logger/index';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): void {
  logger.error({ err });
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
