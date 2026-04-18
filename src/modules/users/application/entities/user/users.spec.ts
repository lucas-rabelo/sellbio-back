import { User } from './users';
import { Password } from '../password/password';
import { ROLE_ENUM } from '@/app/core';

describe('User Domain Entity', () => {
  const createValidPassword = () => Password.restore('any_valid_hash');
  const dataUser = {
    name: 'Lucas Souza',
    email: 'lucas@example.com',
    passwordHash: createValidPassword(),
    phone: '11999999999',
    birthDate: new Date('1990-01-01'),
    role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
  };

  it('should be able to create a new user', () => {
    const user = new User(dataUser);

    expect(user).toBeInstanceOf(User);
    expect(user.uuid).toBeDefined();
    expect(user.isActived).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should update name and trigger updatedAt', async () => {
    const user = new User({
      name: 'Original Name',
      email: 'test@test.com',
      passwordHash: createValidPassword(),
      phone: '11',
      birthDate: new Date(),
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
    });

    const initialUpdatedAt = user.updatedAt;
    
   
    await new Promise(resolve => setTimeout(resolve, 10));

    user.name = 'Updated Name';

    expect(user.name).toBe('Updated Name');
    expect(user.updatedAt).not.toBe(initialUpdatedAt);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should be able to deactivate and reactivate a user', () => {
    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      passwordHash: createValidPassword(),
      phone: '11',
      birthDate: new Date(),
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
    });

    user.deactivate();
    expect(user.isActived).toBe(false);

    user.activate();
    expect(user.isActived).toBe(true);
  });

  it('should be able to soft delete a user', () => {
    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      passwordHash: createValidPassword(),
      phone: '11',
      birthDate: new Date(),
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
    });

    expect(user.deletedAt).toBeNull();

    user.delete();

    expect(user.deletedAt).toBeInstanceOf(Date);
  });

  it('should accept an existing UUID when restoring from database', () => {
    const fixedUuid = 'custom-uuid-123';
    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      passwordHash: createValidPassword(),
      phone: '11',
      birthDate: new Date(),
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
    }, fixedUuid);

    expect(user.uuid).toBe(fixedUuid);
  });
});