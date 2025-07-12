import type { Request, Response } from 'express-serve-static-core';
import { RoleRepository } from '@database/repositories/role.repository';

const roleRepo = new RoleRepository();

export class RoleController {
  async create(req: Request, res: Response) {
    try {
      const role = await roleRepo.create(req.body);
      res.status(201).json(role);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating role' });
    }
  }

  async list(_req: Request, res: Response) {
    try {
      const roles = await roleRepo.findAll();
      return res.json(roles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching roles' });
    }
  }
}
