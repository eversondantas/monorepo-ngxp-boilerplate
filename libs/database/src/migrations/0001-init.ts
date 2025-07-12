import { QueryInterface, DataTypes } from 'sequelize';

export async function up({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.createTable('roles', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  await queryInterface.createTable('users', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    role_id: {
      type: DataTypes.UUID,
      references: { model: 'roles', key: 'id' },
      allowNull: false,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.dropTable('users');
  await queryInterface.dropTable('roles');
}
