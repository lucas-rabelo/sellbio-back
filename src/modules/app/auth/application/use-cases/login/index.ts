import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import type { CompareBcryptService } from '@/src/modules/shared/bcrypt/application/services/compare';
import type { CreateTokenJwtService } from '@/src/modules/shared/jwt/application/services/create-token';
import { Injectable } from '@nestjs/common';
import type { AuthRepository } from '../../../infra/http/database/auth.repository';
import { CONTEXT_AUTH } from '../../constants/contexts';
import type { LoginAuthRequestProps, LoginAuthResponseProps } from './types';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly compareBcryptService: CompareBcryptService,
    private readonly createTokenJwtService: CreateTokenJwtService,
  ) {}

  async execute(
    request: LoginAuthRequestProps,
  ): Promise<LoginAuthResponseProps> {
    const { email, password } = request;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(
        CONTEXT_AUTH.LOGIN,
        'Email or password is incorrect',
      );
    }

    const passwordMatch = await this.compareBcryptService.execute(
      password,
      user.passwordHash.value,
    );

    if (!passwordMatch) {
      throw new BadRequestException(
        CONTEXT_AUTH.LOGIN,
        'Email or password is incorrect',
      );
    }

    const tokenUserObject = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate.toString(),
      phone: user.phone,
      role: user.role,
      isActived: user.isActived,
    };

    const { token: access_token } = await this.createTokenJwtService.execute({
      user: tokenUserObject,
      options: {
        expiresIn: '30 minutes',
      },
    });

    const { token: refresh_token } = await this.createTokenJwtService.execute({
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        birthDate: user.birthDate.toString(),
        phone: user.phone,
        role: user.role,
        isActived: user.isActived,
      },
      options: {
        expiresIn: '1 day',
      },
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
