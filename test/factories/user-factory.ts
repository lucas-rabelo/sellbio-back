import { ROLE_ENUM } from '@/src/core';
import { Password } from '@/src/modules/app/users/application/entities/password/password';
import type { UserProps } from '@/src/modules/app/users/application/entities/user/types';
import { User } from '@/src/modules/app/users/application/entities/user/users';

type Override = Partial<UserProps>;

export function makeUser(context: string, override: Override = {}) {
  Password.validate(context, '12ab34CD@', '12ab34CD@');
  const passwordHash = Password.use('encrypted-password');

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
