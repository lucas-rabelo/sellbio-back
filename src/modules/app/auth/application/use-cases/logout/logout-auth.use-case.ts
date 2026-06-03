import { RevokeRefreshTokenUseCase } from '@/src/modules/shared/jwt/application/services/revoke-refresh-token/revoke-refresh-token.use-case';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../infra/http/database/auth.repository';
import type { LogoutAuthRequestProps } from './types';

@Injectable()
export class LogoutAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly revokeRefreshTokenUseCase: RevokeRefreshTokenUseCase,
  ) {}

  async execute(input: LogoutAuthRequestProps): Promise<void> {
    const { userUuid, tokenUuid } = input;

    await Promise.all([
      this.authRepository.revokeRefreshToken(tokenUuid),
      this.revokeRefreshTokenUseCase.execute({ userUuid, jti: tokenUuid }),
    ]);
  }
}
