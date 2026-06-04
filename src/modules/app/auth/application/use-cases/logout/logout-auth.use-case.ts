// use-cases/logout/logout.use-case.ts
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { CONTEXT_AUTH } from '../../constants/contexts';
import type { LogoutAuthRequestProps } from './types';
import { AuthRepository } from '../../../infra/http/database/auth.repository';
import { RevokeRefreshTokenUseCase } from '@/src/modules/shared/jwt/application/services/revoke-refresh-token/revoke-refresh-token.use-case';

@Injectable()
export class LogoutAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly revokeRefreshTokenUseCase: RevokeRefreshTokenUseCase,
  ) {}

  async execute(request: LogoutAuthRequestProps): Promise<void> {
    const { userUuid, refreshToken } = request;

    const [tokenUuid] = refreshToken.split('.');
    if (!tokenUuid) {
      throw new BadRequestException(
        CONTEXT_AUTH.LOGIN,
        'Invalid refresh token format',
      );
    }

    await Promise.all([
      this.authRepository.revokeRefreshToken(tokenUuid),
      this.revokeRefreshTokenUseCase.execute({ userUuid, jti: tokenUuid }),
    ]);
  }
}
