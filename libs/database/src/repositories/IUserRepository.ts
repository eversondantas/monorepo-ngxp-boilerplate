import { User } from '../entities/user.entity';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, updates: Partial<CreateUserDTO>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
