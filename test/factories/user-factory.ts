import { ROLE_ENUM } from "@/app/core";
import { Password } from "@/app/modules/users/application/entities/password/password";
import type { UserProps } from "@/app/modules/users/application/entities/user/types";
import { User } from "@/app/modules/users/application/entities/user/users";

type Override = Partial<UserProps>;

export function makeUser(context: string, override: Override = {}) {
  return new User({
    name: 'Lucas Rabelo de Souza',
    email: 'lucas.rabelo@email.com',
    phone: '5516978546985',
    birthDate: new Date(),
    passwordHash: Password.create(context, '12ab34CD@', '12ab34CD@'),
    role: ROLE_ENUM.SELLER as keyof typeof ROLE_ENUM,
    ...override,
  });
}