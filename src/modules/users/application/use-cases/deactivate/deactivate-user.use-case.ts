import { NotFoundException } from "@/app/core/exceptions/not-found.exception";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../infra/http/database/users.repository";
import type { DeactiveUserRequestProps, DeactiveUserResponseProps } from "./types";
import { CONTEXT_USER } from "../../constants/contexts";

@Injectable()
export class DeactivateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute({ userUuid }: DeactiveUserRequestProps): Promise<DeactiveUserResponseProps> {
    const user = await this.usersRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException(CONTEXT_USER.DEACTIVE);
    }

    user.deactivate();

    await this.usersRepository.save(user);
  }
}