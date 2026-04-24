import { NotFoundException } from "@/core/exceptions/not-found.exception";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../infra/http/database/users.repository";
import { CONTEXT_USER } from "../../constants/contexts";
import { Password } from "../../entities/password/password";
import type { UpdateUserRequestProps, UpdateUserResponseProps } from "./types";
import { EncryptedPasswordAuthService } from "@/modules/app/auth/application/services/encrypted-password/encrypted-password-auth.service";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptedPasswordAuthService: EncryptedPasswordAuthService,
  ) { }

  async execute({ userUuid, body }: UpdateUserRequestProps): Promise<UpdateUserResponseProps> {
    const user = await this.usersRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException(CONTEXT_USER.UPDATE);
    }

    
    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    if (body.phone) user.phone = body.phone;
    if (body.birthDate) user.birthDate = new Date(body.birthDate);
    if (body.avatarUrl) user.avatarUrl = body.avatarUrl;
    if (body.refreshToken) user.refreshToken = body.refreshToken;
    if (body.role) user.role = body.role;

    if (body.password) {
      Password.validate(CONTEXT_USER.UPDATE,body.password, body.confirmPassword);
      const hash = await this.encryptedPasswordAuthService.execute(body.password);
      user.passwordHash = Password.use(hash);
    }

    await this.usersRepository.save(user);

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