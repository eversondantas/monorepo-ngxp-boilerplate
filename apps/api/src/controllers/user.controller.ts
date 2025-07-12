import { Request, Response } from 'express';
import { UserRepository } from '@database/repositories/user.repository';
import { initDatabase } from '@database/database.module';

const userRepo = new UserRepository();
let dbInitialized = false;

async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export class UserController {
  async create(req: Request, res: Response) {
    try {
      await ensureDb();
      const user = await userRepo.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  async list(_req: Request, res: Response) {
    try {
      await ensureDb();
      const users = await userRepo.findAll();
      return res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching users' });
    }
  }

  async get(req: Request, res: Response) {
    try {
      await ensureDb();
      const user = await userRepo.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching user' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      await ensureDb();
      const user = await userRepo.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating user' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await ensureDb();
      const ok = await userRepo.delete(req.params.id);
      if (!ok) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting user' });
    }
  }
}
