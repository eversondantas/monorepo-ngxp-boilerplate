import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import createError from 'http-errors';
import { sequelize } from '@database/connection';
import { HelloController } from './controllers/hello.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { config } from '@config/index';
import { errorHandler } from './middleware/errorHandler';
import { validate } from './middleware/validate';
import { createUserSchema, updateUserSchema } from './validators/user.validator';
import { createRoleSchema } from './validators/role.validator';

/** Create and configure an Express application. */
export function createApp() {
  const app = express();
  const PORT = config.app.port;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', async (_req, res) => {
    try {
      await sequelize.authenticate();
      res.json({ status: 'ok', db: 'up', timestamp: new Date().toISOString() });
    } catch {
      res.status(503).json({ status: 'fail', db: 'down' });
    }
  });

  const helloController = new HelloController();
  const userController = new UserController();
  const roleController = new RoleController();

  app.get('/hello', (_req, res) => res.json(helloController.getHello()));
  app.get('/hello/:name', (req, res) =>
    res.json(helloController.getPersonalizedHello(req.params.name))
  );

  app.post(
    '/users',
    validate(createUserSchema),
    (req, res, next) => void userController.create(req, res, next)
  );
  app.get('/users', (req, res, next) => void userController.list(req, res, next));
  app.get('/users/:id', (req, res, next) => void userController.get(req, res, next));
  app.put(
    '/users/:id',
    validate(updateUserSchema),
    (req, res, next) => void userController.update(req, res, next)
  );
  app.delete('/users/:id', (req, res, next) => void userController.delete(req, res, next));

  app.post(
    '/roles',
    validate(createRoleSchema),
    (req, res, next) => void roleController.create(req, res, next)
  );
  app.get('/roles', (req, res, next) => void roleController.list(req, res, next));

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const swaggerDocument = require('../build/swagger.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger UI available at http://localhost:' + PORT + '/api-docs');
  } catch {
    console.warn('Swagger documentation not available.');
  }

  app.use((_req, _res, next) => {
    next(createError(404, 'Not Found'));
  });

  app.use(errorHandler);

  return app;
}
