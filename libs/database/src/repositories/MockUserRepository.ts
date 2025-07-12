import { IUserRepository, CreateUserDTO } from './IUserRepository';
import { User } from '../entities/user.entity';
import { v4 as uuid } from 'uuid';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: CreateUserDTO): Promise<User> {
    const user: User = {
      ...data,
      id: uuid(),
      passwordHash: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as User;
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async update(id: string, updates: Partial<CreateUserDTO>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;
    Object.assign(user, updates, { updatedAt: new Date() });
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
