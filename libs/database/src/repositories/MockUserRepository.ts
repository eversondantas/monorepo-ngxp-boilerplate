import { IUserRepository, CreateUserDTO } from './IUserRepository';
import { User } from '../entities/user.entity';
import { v4 as uuid } from 'uuid';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  create(data: CreateUserDTO): Promise<User> {
    const user: User = {
      ...data,
      id: uuid(),
      passwordHash: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as User;
    this.users.push(user);
    return Promise.resolve(user);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findById(id: string): Promise<User | null> {
    return Promise.resolve(this.users.find(u => u.id === id) || null);
  }

  update(id: string, updates: Partial<CreateUserDTO>): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    if (!user) return Promise.resolve(null);
    Object.assign(user, updates, { updatedAt: new Date() });
    return Promise.resolve(user);
  }

  delete(id: string): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return Promise.resolve(false);
    this.users.splice(index, 1);
    return Promise.resolve(true);
  }
}
