import { UserService } from '../user.service';
import { MockUserRepository } from '@database/repositories/MockUserRepository';
import { v4 as uuid } from 'uuid';

describe('UserService', () => {
  const repo = new MockUserRepository();
  const service = new UserService(repo);

  it('creates a user', async () => {
    const user = await service.create({
      name: 'Test',
      email: 't@example.com',
      password: '123',
      roleId: uuid(),
    });
    expect(user.id).toBeDefined();
  });
});
