import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, Unique, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role } from './role.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  name!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(150))
  email!: string;

  @AllowNull(false)
  @Column({ field: 'password_hash', type: DataType.STRING(255) })
  passwordHash!: string;

  @ForeignKey(() => Role)
  @Column({ field: 'role_id', type: DataType.UUID })
  roleId!: string;

  @BelongsTo(() => Role)
  role?: Role;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date;
}
