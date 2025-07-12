import { Request, Response } from 'express';
import { UserRepository } from '@database/repositories/user.repository';
import { UserService } from '../services/user.service';

const service = new UserService(new UserRepository());

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = await service.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  async list(_req: Request, res: Response) {
    try {
      const users = await service.findAll();
      return res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching users' });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const user = await service.findById(req.params.id);
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
      const user = await service.update(req.params.id, req.body);
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
      const ok = await service.delete(req.params.id);
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
