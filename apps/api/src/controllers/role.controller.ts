import type { Request, Response, NextFunction } from 'express-serve-static-core';
import { RoleRepository } from '@database/repositories/role.repository';
import { createRoleSchema } from '../validators/role.validator';

const roleRepo = new RoleRepository();

export class RoleController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { error } = createRoleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      const role = await roleRepo.create(req.body);
      res.status(201).json(role);
    } catch (err) {
      next(err);
    }
  }

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await roleRepo.findAll();
      return res.json(roles);
    } catch (err) {
      next(err);
    }
  }
}
