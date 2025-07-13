import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import createError, { HttpError } from 'http-errors';
import { HelloController } from './controllers/hello.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { config } from '@config/index';

/** Create and configure an Express application. */
export function createApp() {
  const app = express();
  const PORT = config.app.port;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const helloController = new HelloController();
  const userController = new UserController();
  const roleController = new RoleController();

  app.get('/hello', (_req, res) => res.json(helloController.getHello()));
  app.get('/hello/:name', (req, res) =>
    res.json(helloController.getPersonalizedHello(req.params.name))
  );

  app.post('/users', (req, res) => void userController.create(req, res));
  app.get('/users', (req, res) => void userController.list(req, res));
  app.get('/users/:id', (req, res) => void userController.get(req, res));
  app.put('/users/:id', (req, res) => void userController.update(req, res));
  app.delete('/users/:id', (req, res) => void userController.delete(req, res));

  app.post('/roles', (req, res) => void roleController.create(req, res));
  app.get('/roles', (req, res) => void roleController.list(req, res));

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

  app.use((err: HttpError, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message,
      ...(config.app.nodeEnv === 'development' && { stack: err.stack }),
    });
  });

  return app;
}
