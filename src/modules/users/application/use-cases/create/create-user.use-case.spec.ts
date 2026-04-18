import { DEFAULT_MESSAGES, ROLE_ENUM } from "@/app/core";
import { BadRequestException } from "@/app/core/exceptions/bad-request.exception";
import { makeUser } from "@/test/factories/user-factory";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { CreateUserUseCase } from "./create-user.use-case";

describe('Create user', () => {
  it("should be able to create user", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserUseCase(userRepository);

    const { user } = await createUser.execute({
      name: 'Lucas Rabelo de Souza',
      email: 'lucas.rabelo@email.com',
      phone: '5516978546985',
      birthDate: new Date(),
      password: '12ab34CD@',
      confirmPassword: '12ab34CD@',
      role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
      isActived: true,
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });

  it("should not be able to create user with email already exist", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserUseCase(userRepository);

    const user = makeUser();
    await userRepository.create(user);

    expect(async () => {
      return await createUser.execute({
        name: 'Lucas Rabelo de Souza',
        email: 'lucas.rabelo@email.com',
        phone: '5516978546985',
        birthDate: new Date(),
        password: '12ab34CD@',
        confirmPassword: '12ab34CD@',
        role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
        isActived: true,
      });
    }).rejects.toThrow(new BadRequestException(CONTEXT_USER.CREATE, DEFAULT_MESSAGES.ERROR_CREATE + " E-mail already exist"));
  });

  it("", async () => { })
});