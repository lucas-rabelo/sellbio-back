import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infra/http/database/users.repository';
import { CONTEXT_USER } from '../../constants/contexts';
import { Password } from '../../entities/password/password';
import type { UpdateUserRequestProps, UpdateUserResponseProps } from './types';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    userUuid,
    body,
  }: UpdateUserRequestProps): Promise<UpdateUserResponseProps> {
    const user = await this.usersRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException(CONTEXT_USER.UPDATE);
    }

    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    if (body.phone) user.phone = body.phone;
    if (body.birthDate) user.birthDate = new Date(body.birthDate);
    if (body.avatarUrl) user.avatarUrl = body.avatarUrl;
    if (body.refreshToken) user.refreshToken = body.refreshToken;
    if (body.role) user.role = body.role;

    if (body.password) {
      Password.validate(
        CONTEXT_USER.UPDATE,
        body.password,
        body.confirmPassword,
      );

      // set new password hash when password is provided
      user.passwordHash = Password.use(body.password);
    }

    await this.usersRepository.save(user);

    return {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      birthDate: new Date(user.birthDate).toISOString(),
      phone: user.phone,
      avatarUrl: user.avatarUrl ?? '',
      isActived: user.isActived,
      role: user.role,
    };
  }
}
