import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Role } from './role.entity';

@Table({ tableName: 'users' })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare name: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(150))
  declare email: string;

  @AllowNull(false)
  @Column({ field: 'password_hash', type: DataType.STRING(255) })
  declare passwordHash: string;

  @ForeignKey(() => Role)
  @Column({ field: 'role_id', type: DataType.UUID })
  declare roleId: string;

  @BelongsTo(() => Role)
  declare role?: Role;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;
}
