import { initDatabase, closeDatabase } from './database.module';
import { RoleRepository } from './repositories/role.repository';
import { UserRepository } from './repositories/user.repository';

export async function seed() {
  await initDatabase();

  const roleRepo = new RoleRepository();
  const userRepo = new UserRepository();

  const adminRole = await roleRepo.create({ name: 'admin' });

  await userRepo.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    roleId: adminRole.id,
  });

  await closeDatabase();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
