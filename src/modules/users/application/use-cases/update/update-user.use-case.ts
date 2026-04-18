import { NotFoundException } from "@/app/core/exceptions/not-found.exception";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../infra/http/database/users.repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { Password } from "../../entities/password/password";
import type { UpdateUserRequestProps, UpdateUserResponseProps } from "./types";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute({ userUuid, data }: UpdateUserRequestProps): Promise<UpdateUserResponseProps> {
    const user = await this.usersRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException(CONTEXT_USER.UPDATE);
    }

    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.phone) user.phone = data.phone;
    if (data.birthDate) user.birthDate = new Date(data.birthDate);
    if (data.avatarUrl) user.avatarUrl = data.avatarUrl;
    if (data.password) user.passwordHash = Password.create(data.password, data.confirmPassword);

    await this.usersRepository.save(user);

    return {
      user,
    };
  }
}