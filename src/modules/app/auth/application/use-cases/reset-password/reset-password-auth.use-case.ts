import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { UpdateUserUseCase } from '@/src/modules/app/users/application/use-cases/update/update-user.use-case';
import { CreateTokenJwtService } from '@/src/modules/shared/jwt/application/services/create-token/create-token-jwt.service';
import { CONTEXT_AUTH } from '../../../application/constants/contexts';
import { CreateRefreshTokenService } from '../../services/create-refresh-token/create-refresh-token.service';
import type {
  ResetPasswordAuthRequestProps,
  ResetPasswordAuthResponseProps,
} from './types';

@Injectable()
export class ResetPasswordAuthUseCase {
  constructor(
    private readonly createRefreshTokenService: CreateRefreshTokenService,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly createTokenJwtService: CreateTokenJwtService,
  ) {}

  async execute(
    request: ResetPasswordAuthRequestProps,
  ): Promise<ResetPasswordAuthResponseProps> {
    const { password, confirmPassword } = request;

    const userUuid = '';
    const user = await this.updateUserUseCase.execute({
      userUuid,
      body: { password, confirmPassword },
    });

    if (!user) {
      throw new NotFoundException(CONTEXT_AUTH.RESET_PASSWORD);
    }

    const { token: access_token } = await this.createTokenJwtService.execute({
      user,
      options: { expiresIn: '30 minutes' },
    });

    const refresh_token =
      await this.createRefreshTokenService.execute(userUuid);

    return { access_token, refresh_token };
  }
}
