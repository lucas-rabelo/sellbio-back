import { NotFoundException } from "@/core/exceptions/not-found.exception";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../infra/http/database/users.repository";
import type { ActiveUserRequestProps, ActiveUserResponseProps } from "./types";
import { CONTEXT_USER } from "../../constants/contexts";

@Injectable()
export class ActiveUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(userUuid: ActiveUserRequestProps): Promise<ActiveUserResponseProps> {
    const user = await this.usersRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException(CONTEXT_USER.ACTIVE);
    }

    user.activate();
    user.touch();

    await this.usersRepository.save(user);
  }
}