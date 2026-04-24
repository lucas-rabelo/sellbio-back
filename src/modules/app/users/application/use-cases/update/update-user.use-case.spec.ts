import { NotFoundException } from "@/core/exceptions/not-found.exception";
import { makeUser } from "@/test/factories/user-factory";
import { InMemoryAuthRepository } from "@/test/repositories/in-memory-auth-repository";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { UpdateUserUseCase } from "./update-user.use-case";

describe("Update user", () => {
  it("should be able update user", async () => {
    const userRepository = new InMemoryUserRepository();
    const authRepository = new InMemoryAuthRepository();
    const updateUser = new UpdateUserUseCase(userRepository, authRepository);

    const userMaked = await makeUser(CONTEXT_USER.UPDATE);
    await userRepository.create(userMaked);

    const request = {
      ...userMaked,
      name: 'Emainara Cordeiro',
    };

    const user = await updateUser.execute({ userUuid: userMaked.uuid, body: request });

    const userUpdated = {
      uuid: userRepository.users[0].uuid,
      name: userRepository.users[0].name,
      email: userRepository.users[0].email,
      birthDate: new Date(userRepository.users[0].birthDate).toISOString(),
      phone: userRepository.users[0].phone,
      avatarUrl: userRepository.users[0].avatarUrl ?? '',
      isActived: userRepository.users[0].isActived,
      role: userRepository.users[0].role,
    };

    expect(userUpdated).toEqual(user);
  });

  it("should not be able to update user", async () => {
    const userRepository = new InMemoryUserRepository();
    const authRepository = new InMemoryAuthRepository();
    const updateUser = new UpdateUserUseCase(userRepository, authRepository);

    const userMaked = await makeUser(CONTEXT_USER.CREATE);
    await userRepository.create(userMaked);

    const request = {
      ...userMaked,
      name: 'Emainara Cordeiro',
    };

    expect(() => {
      return updateUser.execute({
        userUuid: 'fake-user-uuid',
        body: request,
      });
    }).rejects.toThrow(new NotFoundException(CONTEXT_USER.UPDATE));
  });
});