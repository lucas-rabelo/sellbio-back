import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { CompareBcryptService } from '@/src/modules/shared/bcrypt/application/services/compare/compare-bcrypt.service';
import { CreateTokenJwtService } from '@/src/modules/shared/jwt/application/services/create-token/create-token-jwt.service';
import { AuthRepository } from '../../../infra/http/database/auth.repository';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { CreateRefreshTokenService } from '../../services/create-refresh-token/create-refresh-token.service';
import type { LoginAuthRequestProps, LoginAuthResponseProps } from './types';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly compareBcryptService: CompareBcryptService,
    private readonly createTokenJwtService: CreateTokenJwtService,
    private readonly createRefreshTokenService: CreateRefreshTokenService,
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

    const refresh_token = await this.createRefreshTokenService.execute(
      user.uuid,
    );

    return {
      access_token,
      refresh_token,
    };
  }
}
