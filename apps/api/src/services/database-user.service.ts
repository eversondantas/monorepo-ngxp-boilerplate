import { Role } from '@database/entities/role.entity';
import { User } from '@database/entities/user.entity';
import { logger } from '@logger/index';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  roleId?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  roleId?: string;
}

export class DatabaseUserService {
  async create(userData: CreateUserRequest) {
    try {
      // Para uma implementação simples, vamos usar hash simples por enquanto
      const passwordHash = Buffer.from(userData.password).toString('base64');

      const user = await User.create({
        name: userData.name,
        email: userData.email,
        passwordHash,
        roleId: userData.roleId || (await this.getDefaultRoleId()),
      });

      return user;
    } catch (error) {
      logger.error({ error }, 'Error creating user');
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await User.findAll({
        include: [Role],
        attributes: { exclude: ['passwordHash'] },
      });
      return users;
    } catch (error) {
      logger.error({ error }, 'Error fetching users');
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const user = await User.findByPk(id, {
        include: [Role],
        attributes: { exclude: ['passwordHash'] },
      });
      return user;
    } catch (error) {
      logger.error({ error }, 'Error fetching user by id');
      throw error;
    }
  }

  async update(id: string, userData: UpdateUserRequest) {
    try {
      const updateData: any = { ...userData };

      if (userData.password) {
        updateData.passwordHash = Buffer.from(userData.password).toString('base64');
        delete updateData.password;
      }

      const [affectedCount] = await User.update(updateData, {
        where: { id },
      });

      if (affectedCount === 0) {
        throw new Error('User not found');
      }

      return this.findById(id);
    } catch (error) {
      logger.error({ error }, 'Error updating user');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const deletedCount = await User.destroy({
        where: { id },
      });

      if (deletedCount === 0) {
        throw new Error('User not found');
      }

      return { deleted: true };
    } catch (error) {
      logger.error({ error }, 'Error deleting user');
      throw error;
    }
  }

  private async getDefaultRoleId(): Promise<string> {
    try {
      let role = await Role.findOne({ where: { name: 'user' } });

      if (!role) {
        role = await Role.create({ name: 'user' });
        logger.info('Created default user role');
      }

      return role.id;
    } catch (error) {
      logger.error({ error }, 'Error getting default role');
      throw error;
    }
  }
}
