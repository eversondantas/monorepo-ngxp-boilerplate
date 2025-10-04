import { IUserRepository, CreateUserDTO } from '@database/repositories/IUserRepository';
import { User } from '@database/entities';

export class UserService {
  constructor(private readonly repository: IUserRepository) {}

  create(data: CreateUserDTO): Promise<User> {
    return this.repository.create(data);
  }

  findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  findById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  update(id: string, updates: Partial<CreateUserDTO>): Promise<User | null> {
    return this.repository.update(id, updates);
  }

  delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
