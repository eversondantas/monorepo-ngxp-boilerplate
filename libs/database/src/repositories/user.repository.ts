import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { hash } from 'bcrypt';
import { IUserRepository, CreateUserDTO } from './IUserRepository';
import type { InferCreationAttributes } from 'sequelize';

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const passwordHash = await hash(data.password, 10);
    const attributes: InferCreationAttributes<User> = {
      name: data.name,
      email: data.email,
      passwordHash,
      roleId: data.roleId,
    };
    return User.create(attributes);
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
    const updateData: Partial<InferCreationAttributes<User>> = {
      ...updates,
    } as Partial<InferCreationAttributes<User>>;
    if ('password' in updates && updates.password) {
      (updateData as { passwordHash?: string }).passwordHash = await hash(updates.password, 10);
    }
    await user.update(updateData);
    return user.reload({ include: [Role] });
  }

  async delete(id: string): Promise<boolean> {
    const count = await User.destroy({ where: { id } });
    return count > 0;
  }
}
