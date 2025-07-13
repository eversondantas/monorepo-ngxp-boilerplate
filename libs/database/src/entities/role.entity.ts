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
  HasMany,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { User } from './user.entity';

@Table({ tableName: 'roles' })
export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: CreationOptional<string>;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(50))
  declare name: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: CreationOptional<Date>;

  @HasMany(() => User)
  declare users?: User[];
}
