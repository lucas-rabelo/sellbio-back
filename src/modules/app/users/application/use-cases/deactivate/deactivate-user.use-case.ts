import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infra/http/database/users.repository';
import type {
  DeactivateUserRequestProps,
  DeactivateUserResponseProps,
} from './types';
import { CONTEXT_USER } from '../../constants/contexts';

@Injectable()
export class DeactivateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    userUuid: DeactivateUserRequestProps,
  ): Promise<DeactivateUserResponseProps> {
    const user = await this.usersRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException(CONTEXT_USER.DEACTIVE);
    }

    user.deactivate();
    user.touch();

    await this.usersRepository.save(user);
  }
}
