import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { makeUser } from '@/test/factories/user-factory';
import { InMemoryUserRepository } from '@/test/repositories/in-memory-users-repository';
import { CONTEXT_USER } from '../../constants/contexts';
import { ActiveUserUseCase } from './active-user.use-case';

describe('Active user', () => {
  it('should be able to active a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const activeUser = new ActiveUserUseCase(userRepository);

    const user = makeUser(CONTEXT_USER.CREATE);

    await userRepository.create(user);

    await activeUser.execute(user.uuid);

    expect(userRepository.users[0].isActived).toBeTruthy();
  });

  it('should not be able to active a non exist user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const activeUser = new ActiveUserUseCase(usersRepository);

    await expect(() => {
      return activeUser.execute('fake-user-uuid');
    }).rejects.toThrow(new NotFoundException(CONTEXT_USER.ACTIVE));
  });
});
