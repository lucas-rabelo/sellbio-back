import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infra/http/database/users.repository';
import type { ListUserRequestProps, ListUserResponseProps } from './types';

@Injectable()
export class ListUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: ListUserRequestProps): Promise<ListUserResponseProps> {
    const { total, data } = await this.usersRepository.list(request);

    return {
      total,
      data,
    };
  }
}
