import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infra/http/database/users.repository';
import { CONTEXT_USER } from '../../constants/contexts';
import type {
  FindByEmailUserRequestProps,
  FindByEmailUserResponseProps,
} from './types';

@Injectable()
export class FindByEmailUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    email: FindByEmailUserRequestProps,
  ): Promise<FindByEmailUserResponseProps | null> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(CONTEXT_USER.FIND, 'User not found');
    }

    return {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      birthDate: new Date(user.birthDate).toISOString(),
      phone: user.phone,
      passwordHash: user.passwordHash.value,
      avatarUrl: user.avatarUrl ?? '',
      isActived: user.isActived,
      role: user.role,
    };
  }
}
