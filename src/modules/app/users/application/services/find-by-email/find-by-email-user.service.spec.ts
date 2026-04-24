import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { FindByEmailUserService } from "./find-by-email-user.service";
import { CONTEXT_USER } from "../../constants/contexts";
import { makeUser } from "@/test/factories/user-factory";
import { BadRequestException } from "@/app/core/exceptions/bad-request.exception";

describe("Find By Email User Service", () => {
  it("should be able to find user with email", async () => {
    const userRepository = new InMemoryUserRepository();
    const findByEmailUser = new FindByEmailUserService(userRepository);

    const userMaked = await makeUser(CONTEXT_USER.FIND);
    await userRepository.create(userMaked);

    const user = await findByEmailUser.execute(userMaked.email);

    const userFounded = {
      uuid: userRepository.users[0].uuid,
      name: userRepository.users[0].name,
      email: userRepository.users[0].email,
      birthDate: new Date(userRepository.users[0].birthDate).toISOString(),
      phone: userRepository.users[0].phone,
      passwordHash: userRepository.users[0].passwordHash.value,
      avatarUrl: userRepository.users[0].avatarUrl ?? '',
      isActived: userRepository.users[0].isActived,
      role: userRepository.users[0].role,
    }

    expect(userFounded).toEqual(user);
  });

  it('should not be able to find a non exist user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const findByEmailUser = new FindByEmailUserService(usersRepository);

    expect(() => {
      return findByEmailUser.execute('fake-user-email');
    }).rejects.toThrow(new BadRequestException(CONTEXT_USER.FIND, 'User not found'));
  });
});