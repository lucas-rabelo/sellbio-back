import { ROLE_ENUM } from '@/app/core';
import { InMemoryAuthRepository } from '@/test/repositories/in-memory-auth-repository';
import { CONTEXT_USER } from '../../constants/contexts';
import { Password } from '../password/password';
import { User } from './users';

describe('User Domain Entity', () => {
  const dataUser = {
    name: 'Lucas Souza',
    email: 'lucas@example.com',
    phone: '11999999999',
    birthDate: new Date('1990-01-01'),
    role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
    refreshToken: '',
  };

  it('should be able to create a new user', async () => {
    const authRepository = new InMemoryAuthRepository();
    Password.validate(CONTEXT_USER.CREATE, '12ab34CD@', '12ab34CD@');
    const hash = await authRepository.hash('12ab34CD@');
    const createValidPassword = () => Password.use(hash);

    const user = new User({
      ...dataUser,
      passwordHash: createValidPassword(),
    });

    expect(user).toBeInstanceOf(User);
    expect(user.uuid).toBeDefined();
    expect(user.isActived).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should update name and trigger updatedAt', async () => {
    const authRepository = new InMemoryAuthRepository();
    Password.validate(CONTEXT_USER.CREATE, '12ab34CD@', '12ab34CD@');
    const hash = await authRepository.hash('12ab34CD@');
    const createValidPassword = () => Password.use(hash);

    const user = new User({
      name: 'Original Name',
      email: 'test@test.com',
      passwordHash: createValidPassword(),
      phone: '11',
      birthDate: new Date(),
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
      refreshToken: '',
    });

    const initialUpdatedAt = user.updatedAt;


    await new Promise(resolve => setTimeout(resolve, 10));

    user.name = 'Updated Name';

    expect(user.name).toBe('Updated Name');
    expect(user.updatedAt).not.toBe(initialUpdatedAt);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should be able to deactivate and reactivate a user', async () => {
    const authRepository = new InMemoryAuthRepository();
    Password.validate(CONTEXT_USER.CREATE, '12ab34CD@', '12ab34CD@');
    const hash = await authRepository.hash('12ab34CD@');
    const createValidPassword = () => Password.use(hash);

    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      passwordHash: createValidPassword(),
      phone: '11',
      birthDate: new Date(),
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
      refreshToken: '',
    });

    user.deactivate();
    expect(user.isActived).toBe(false);

    user.activate();
    expect(user.isActived).toBe(true);
  });

  it('should be able to soft delete a user', async () => {
    const authRepository = new InMemoryAuthRepository();
    Password.validate(CONTEXT_USER.CREATE, '12ab34CD@', '12ab34CD@');
    const hash = await authRepository.hash('12ab34CD@');
    const createValidPassword = () => Password.use(hash);

    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      passwordHash: createValidPassword(),
      phone: '11',
      birthDate: new Date(),
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
      refreshToken: '',
    });

    expect(user.deletedAt).toBeNull();

    user.delete();

    expect(user.deletedAt).toBeInstanceOf(Date);
  });

  it('should accept an existing UUID when restoring from database', async () => {
    const authRepository = new InMemoryAuthRepository();
    Password.validate(CONTEXT_USER.CREATE, '12ab34CD@', '12ab34CD@');
    const hash = await authRepository.hash('12ab34CD@');
    const createValidPassword = () => Password.use(hash);

    const fixedUuid = 'custom-uuid-123';
    const user = new User({
      name: 'Test',
      email: 'test@test.com',
      passwordHash: createValidPassword(),
      phone: '11',
      birthDate: new Date(),
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
      refreshToken: '',
    }, fixedUuid);

    expect(user.uuid).toBe(fixedUuid);
  });
});