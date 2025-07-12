import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, Unique, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(50))
  name!: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date;

  @HasMany(() => User)
  users?: User[];
}
