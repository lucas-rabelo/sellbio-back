import { NotFoundException } from "@/app/core/exceptions/not-found.exception";
import { makeUser } from "@/test/factories/user-factory";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { ReadUserUseCase } from "./read-user.use-case";

describe("Read user", () => {
  it("should be able to read user", async () => {
    const userRepository = new InMemoryUserRepository();
    const readUser = new ReadUserUseCase(userRepository);

    const userMaked = makeUser();
    await userRepository.create(userMaked);

    const { user } = await readUser.execute({ userUuid: userMaked.uuid });

    expect(userRepository.users[0]).toEqual(user);
  });

  it('should not be able to read a non exist user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const readUser = new ReadUserUseCase(usersRepository);

    expect(() => {
      return readUser.execute({
        userUuid: 'fake-user-uuid',
      });
    }).rejects.toThrow(new NotFoundException(CONTEXT_USER.READ));
  })
})