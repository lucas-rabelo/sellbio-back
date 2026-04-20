import { NotFoundException } from "@/app/core/exceptions/not-found.exception";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../infra/http/database/users.repository";
import { CONTEXT_USER } from "../../constants/contexts";
import type { DeleteUserRequestProps, DeleteUserResponseProps } from './types';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(userUuid: DeleteUserRequestProps): Promise<DeleteUserResponseProps> {
    const user = await this.usersRepository.findByUuid(userUuid);
    if (!user) {
      throw new NotFoundException(CONTEXT_USER.DELETE);
    }

    user.delete();
    await this.usersRepository.save(user);
  }
}