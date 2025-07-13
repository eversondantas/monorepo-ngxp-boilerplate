import { Role } from '../entities/role.entity';
import type { InferCreationAttributes } from 'sequelize';

export class RoleRepository {
  async create(data: { name: string }): Promise<Role> {
    const attrs: InferCreationAttributes<Role> = { name: data.name };
    return Role.create(attrs);
  }

  async findAll(): Promise<Role[]> {
    return Role.findAll();
  }

  async findById(id: string): Promise<Role | null> {
    return Role.findByPk(id);
  }

  async delete(id: string): Promise<boolean> {
    const count = await Role.destroy({ where: { id } });
    return count > 0;
  }
}
