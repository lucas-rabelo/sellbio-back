import { NotFoundException } from "@/core/exceptions/not-found.exception";
import { makeUser } from "@/test/factories/user-factory";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { ReadUserUseCase } from "./read-user.use-case";

describe("Read user", () => {
  it("should be able to read user", async () => {
    const userRepository = new InMemoryUserRepository();
    const readUser = new ReadUserUseCase(userRepository);

    const userMaked = await makeUser(CONTEXT_USER.CREATE);
    await userRepository.create(userMaked);

    const user = await readUser.execute(userMaked.uuid);

    const userFounded = {
      uuid: userRepository.users[0].uuid,
      name: userRepository.users[0].name,
      email: userRepository.users[0].email,
      birthDate: new Date(userRepository.users[0].birthDate).toISOString(),
      phone: userRepository.users[0].phone,
      avatarUrl: userRepository.users[0].avatarUrl ?? '',
      isActived: userRepository.users[0].isActived,
      role: userRepository.users[0].role,
    }

    expect(userFounded).toEqual(user);
  });

  it('should not be able to read a non exist user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const readUser = new ReadUserUseCase(usersRepository);

    expect(() => {
      return readUser.execute('fake-user-uuid');
    }).rejects.toThrow(new NotFoundException(CONTEXT_USER.READ));
  })
})