import { Request, Response } from 'express';
import { RoleRepository } from '@database/repositories/role.repository';
import { initDatabase } from '@database/database.module';

const roleRepo = new RoleRepository();
let dbInitialized = false;

async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export class RoleController {
  async create(req: Request, res: Response) {
    try {
      await ensureDb();
      const role = await roleRepo.create(req.body);
      res.status(201).json(role);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating role' });
    }
  }

  async list(_req: Request, res: Response) {
    try {
      await ensureDb();
      const roles = await roleRepo.findAll();
      return res.json(roles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching roles' });
    }
  }
}
