import { NotFoundException } from "@/app/core/exceptions/not-found.exception";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../infra/http/database/users.repository";
import { CONTEXT_USER } from "../../constants/contexts";
import type { ReadUserRequestProps, ReadUserResponseProps } from "./types";

@Injectable()
export class ReadUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute({ userUuid }: ReadUserRequestProps): Promise<ReadUserResponseProps> {
    const user = await this.usersRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException(CONTEXT_USER.READ);
    }

    return {
      user
    };
  }
}