import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { hash } from 'bcrypt';
import { IUserRepository, CreateUserDTO } from './IUserRepository';

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const passwordHash = await hash(data.password, 10);
    return User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      roleId: data.roleId,
    });
  }

  async findAll(): Promise<User[]> {
    return User.findAll({ include: [Role] });
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id, { include: [Role] });
  }

  async update(id: string, updates: Partial<CreateUserDTO>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    if (updates.password) {
      updates = { ...updates, passwordHash: await hash(updates.password, 10) };
      delete (updates as any).password;
    }
    await user.update(updates as any);
    return user.reload({ include: [Role] });
  }

  async delete(id: string): Promise<boolean> {
    const count = await User.destroy({ where: { id } });
    return count > 0;
  }
}
