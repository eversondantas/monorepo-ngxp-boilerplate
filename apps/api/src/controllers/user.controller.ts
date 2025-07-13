import type { Request, Response, NextFunction } from 'express-serve-static-core';
import { UserRepository } from '@database/repositories/user.repository';
import { UserService } from '../services/user.service';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { ApiError } from '../errors/ApiError';

const service = new UserService(new UserRepository());

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const user = await service.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.findAll();
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.findById(req.params.id);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const user = await service.update(req.params.id, req.body);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const ok = await service.delete(req.params.id);
      if (!ok) {
        throw new ApiError(404, 'User not found');
      }
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
