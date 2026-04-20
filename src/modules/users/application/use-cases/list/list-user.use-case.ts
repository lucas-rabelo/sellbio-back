import { ROLE_ENUM } from "@/app/core";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../infra/http/database/users.repository";
import type { ListUserRequestProps, ListUserResponseProps } from "./types";
import { CONTEXT_USER } from "../../constants/contexts";

@Injectable()
export class ListUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(request: ListUserRequestProps): Promise<ListUserResponseProps> {
    const { total, data: users } = await this.usersRepository.list(request);

    return {
      total,
      data: users.map(user => ({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate,
        avatarUrl: user.avatarUrl,
        role: user.role,
        isActived: user.isActived,
      })),
    };
  }
}