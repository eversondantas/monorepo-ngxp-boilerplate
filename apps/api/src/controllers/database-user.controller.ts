import { logger } from '@logger/index';
import { DatabaseUserService } from '../services/database-user.service';

export class DatabaseUserController {
  private userService: DatabaseUserService;

  constructor() {
    this.userService = new DatabaseUserService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, roleId } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          error: 'Missing required fields: name, email, password',
        });
      }

      const user = await this.userService.create({
        name,
        email,
        password,
        roleId,
      });

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        createdAt: user.createdAt,
      });
    } catch (error: any) {
      logger.error({ error }, 'Error in create user controller');

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: 'Email already exists',
        });
      }

      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findAll();

      return res.json({
        data: users,
        total: users.length,
      });
    } catch (error) {
      logger.error({ error }, 'Error in list users controller');
      return next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);

      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      return res.json(user);
    } catch (error) {
      logger.error({ error }, 'Error in get user controller');
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, password, roleId } = req.body;

      const user = await this.userService.update(id, {
        name,
        email,
        password,
        roleId,
      });

      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      return res.json(user);
    } catch (error: any) {
      logger.error({ error }, 'Error in update user controller');

      if (error.message === 'User not found') {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          error: 'Email already exists',
        });
      }

      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.userService.delete(id);

      return res.json(result);
    } catch (error: any) {
      logger.error({ error }, 'Error in delete user controller');

      if (error.message === 'User not found') {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      return next(error);
    }
  }
}
