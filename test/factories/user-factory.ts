import { ROLE_ENUM } from "@/app/core";
import { Password } from "@/app/modules/app/users/application/entities/password/password";
import type { UserProps } from "@/app/modules/app/users/application/entities/user/types";
import { User } from "@/app/modules/app/users/application/entities/user/users";
import { InMemoryAuthRepository } from "../repositories/in-memory-auth-repository";

type Override = Partial<UserProps>;

export async function makeUser(context: string, override: Override = {}) {
  const authRepository = new InMemoryAuthRepository();

  Password.validate(context, '12ab34CD@', '12ab34CD@');
  const hash = await authRepository.hash('12ab34CD@');
  const passwordHash = Password.use(hash);

  return new User({
    name: 'Lucas Rabelo de Souza',
    email: 'lucas.rabelo@email.com',
    phone: '5516978546985',
    birthDate: new Date(),
    passwordHash,
    role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
    ...override,
  });
}