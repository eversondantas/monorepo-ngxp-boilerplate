import { sequelize } from '@database/connection';
import { logger } from '@logger/index';
import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { DatabaseUserController } from './controllers/database-user.controller';
import { HelloController } from './controllers/hello.controller';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint with database connection
  app.get('/health', async (_req, res) => {
    try {
      await sequelize.authenticate();
      res.status(200).send({
        status: 'ok',
        db: 'connected',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
      });
    } catch (error) {
      logger.error({ error }, 'Database connection failed');
      res.status(503).send({
        status: 'error',
        db: 'disconnected',
        timestamp: new Date().toISOString(),
      });
    }
  });

  // Hello endpoints
  const helloController = new HelloController();
  app.get('/hello', (_req, res) => res.json(helloController.getHello()));
  app.get('/hello/:name', (req, res) =>
    res.json(helloController.getPersonalizedHello(req.params.name))
  );

  // Database-integrated user endpoints
  const userController = new DatabaseUserController();
  app.post('/users', (req, res, next) => void userController.create(req, res, next));
  app.get('/users', (req, res, next) => void userController.list(req, res, next));
  app.get('/users/:id', (req, res, next) => void userController.get(req, res, next));
  app.put('/users/:id', (req, res, next) => void userController.update(req, res, next));
  app.delete('/users/:id', (req, res, next) => void userController.delete(req, res, next));

  // Simple error handler
  app.use((_req, _res, next) => {
    const error = {
      status: 404,
      message: 'Not Found',
    };
    next(error);
  });

  app.use((err: any, _req: any, res: any, _next: any) => {
    logger.error({ err });
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });

  return app;
}
