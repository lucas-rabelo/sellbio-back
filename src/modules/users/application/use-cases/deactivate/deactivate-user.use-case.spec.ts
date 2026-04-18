import { NotFoundException } from "@/app/core/exceptions/not-found.exception";
import { makeUser } from "@/test/factories/user-factory";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { DeactivateUserUseCase } from "./deactivate-user.use-case";

describe('Deactivate user', () => {
  it('should be able to deactive a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const deactiveUser = new DeactivateUserUseCase(userRepository);

    const user = makeUser();
    await userRepository.create(user);

    await deactiveUser.execute({ userUuid: user.uuid });

    expect(userRepository.users[0].isActived).toBeFalsy();
  });

  it('should not be able to deactive a non exist user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const deactiveUser = new DeactivateUserUseCase(usersRepository);

    expect(() => {
      return deactiveUser.execute({
        userUuid: 'fake-user-uuid',
      });
    }).rejects.toThrow(new NotFoundException(CONTEXT_USER.DEACTIVE));
  })
});