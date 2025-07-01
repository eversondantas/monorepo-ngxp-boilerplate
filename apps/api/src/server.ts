import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { HelloController } from './controllers/hello.controller';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Register manual routes
const helloController = new HelloController();

app.get('/hello', async (_req, res) => {
  try {
    const result = helloController.getHello();
    res.json(result);
  } catch (error) {
    console.error('Error in /hello:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/hello/:name', async (req, res) => {
  try {
    const result = helloController.getPersonalizedHello(req.params.name);
    res.json(result);
  } catch (error) {
    console.error('Error in /hello/:name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Swagger UI setup
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const swaggerDocument = require('../build/swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger UI available at http://localhost:' + PORT + '/api-docs');
} catch {
  console.warn('Swagger documentation not available.');
}

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    message: 'Not Found',
    availableEndpoints: ['/health', '/api-docs', '/hello', '/hello/{name}'],
  });
});

// Error handler
app.use((err: Error & { status?: number }, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});

export default app;
