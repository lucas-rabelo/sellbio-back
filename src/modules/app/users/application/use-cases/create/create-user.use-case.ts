import { DEFAULT_MESSAGES } from "@/app/core/constants/messages";
import { BadRequestException } from "@/app/core/exceptions/bad-request.exception";
import { EncryptedPasswordAuthService } from "@/app/modules/app/auth/application/services/encrypted-password/encrypted-password-auth.service";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../infra/http/database/users.repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { Password } from "../../entities/password/password";
import { User } from "../../entities/user/users";
import type { CreateUserRequestProps, CreateUserResponseProps } from "./types";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptedPasswordAuthService: EncryptedPasswordAuthService,
  ) { }

  async execute(request: CreateUserRequestProps): Promise<CreateUserResponseProps> {
    const userAlreadyExists = await this.usersRepository.findByEmail(request.email);
    if (userAlreadyExists) {
      throw new BadRequestException(CONTEXT_USER.CREATE, DEFAULT_MESSAGES.ERROR_CREATE + " E-mail already exist");
    }

    Password.validate(CONTEXT_USER.CREATE, request.password, request.confirmPassword);
    const hash = await this.encryptedPasswordAuthService.execute(request.password);
    const passwordHash = Password.use(hash);
    const birthDate = new Date(request.birthDate);

    const user = new User({
      ...request,
      passwordHash,
      birthDate,
    });

    await this.usersRepository.create(user);

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