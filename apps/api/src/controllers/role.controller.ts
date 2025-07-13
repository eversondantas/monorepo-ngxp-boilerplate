import type { Request, Response, NextFunction } from 'express-serve-static-core';
import { RoleRepository } from '@database/repositories/role.repository';

const roleRepo = new RoleRepository();

export class RoleController {
  async create(req: Request, res: Response, next: NextFunction) {
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
