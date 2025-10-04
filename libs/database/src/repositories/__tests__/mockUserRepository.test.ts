/* eslint-env jest */
import { describe, it, expect } from '@jest/globals';
import { MockUserRepository } from '../MockUserRepository';
import { v4 as uuid } from 'uuid';

const repo = new MockUserRepository();

describe('MockUserRepository', () => {
  it('creates and retrieves a user', async () => {
    const user = await repo.create({
      name: 'Test',
      email: 'test@example.com',
      password: 'pass',
      roleId: uuid(),
    });
    const found = await repo.findById(user.id);
    expect(found).not.toBeNull();
    expect(found?.email).toBe('test@example.com');
  });
});
