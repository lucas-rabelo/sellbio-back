import { DEFAULT_MESSAGES, ROLE_ENUM } from "@/app/core";
import { BadRequestException } from "@/app/core/exceptions/bad-request.exception";
import { makeUser } from "@/test/factories/user-factory";
import { InMemoryAuthRepository } from "@/test/repositories/in-memory-auth-repository";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { CreateUserUseCase } from "./create-user.use-case";
import type { CreateUserRequestProps } from "./types";

describe('Create user', () => {
  const request: CreateUserRequestProps = {
    name: 'Lucas Rabelo de Souza',
    email: 'lucas.rabelo@email.com',
    phone: '5516978546985',
    birthDate: new Date().toISOString(),
    password: '12ab34CD@',
    confirmPassword: '12ab34CD@',
    role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
    isActived: true,
  };

  it("should be able to create user", async () => {
    const userRepository = new InMemoryUserRepository();
    const authRepository = new InMemoryAuthRepository();
    const createUser = new CreateUserUseCase(userRepository, authRepository);

    const user = await createUser.execute(request);

    const userCreated = {
      uuid: userRepository.users[0].uuid,
      name: userRepository.users[0].name,
      email: userRepository.users[0].email,
      birthDate: new Date(userRepository.users[0].birthDate).toISOString(),
      phone: userRepository.users[0].phone,
      avatarUrl: userRepository.users[0].avatarUrl ?? '',
      isActived: userRepository.users[0].isActived,
      role: userRepository.users[0].role,
    };

    expect(userRepository.users).toHaveLength(1);
    expect(userCreated).toEqual(user);
  });

  it("should not be able to create user with email already exist", async () => {
    const userRepository = new InMemoryUserRepository();
    const authRepository = new InMemoryAuthRepository();
    const createUser = new CreateUserUseCase(userRepository, authRepository);

    const user = await makeUser(CONTEXT_USER.CREATE);
    await userRepository.create(user);

    expect(async () => {
      return await createUser.execute(request);
    }).rejects.toThrow(new BadRequestException(CONTEXT_USER.CREATE, DEFAULT_MESSAGES.ERROR_CREATE + " E-mail already exist"));
  });

  it("", async () => { })
});