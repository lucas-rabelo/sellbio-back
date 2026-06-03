import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { RedisService } from '@/src/infra/redis/services/redis.service';
import { FindByUuidUserService } from '@/src/modules/app/users/application/services/find-by-uuid/find-by-uuid-user.service';
import { CompareBcryptService } from '@/src/modules/shared/bcrypt/application/services/compare/compare-bcrypt.service';
import { GenerateAccessTokenUseCase } from '@/src/modules/shared/jwt/application/services/generate-access-token/generate-access-token.use-case';
import { RevokeAllUserSessionsUseCase } from '@/src/modules/shared/jwt/application/services/revoke-all-user-sessions/revoke-all-user-sessions.use-case';
import { RevokeRefreshTokenUseCase } from '@/src/modules/shared/jwt/application/services/revoke-refresh-token/revoke-refresh-token.use-case';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../../../infra/http/database/auth.repository';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { CreateRefreshTokenService } from '../../services/create-refresh-token/create-refresh-token.service';
import type {
  ValidateRefreshTokenAuthRequestProps,
  ValidateRefreshTokenAuthResponseProps,
} from './types';
import { REDIS_KEYS } from '@/src/infra/redis/constants';

@Injectable()
export class ValidateRefreshTokenAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly redisService: RedisService,
    private readonly compareBcryptService: CompareBcryptService,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly createRefreshTokenService: CreateRefreshTokenService,
    private readonly revokeRefreshTokenUseCase: RevokeRefreshTokenUseCase,
    private readonly revokeAllUserSessionsUseCase: RevokeAllUserSessionsUseCase,
    private readonly findByUuidUserService: FindByUuidUserService,
  ) {}

  async execute(
    request: ValidateRefreshTokenAuthRequestProps,
  ): Promise<ValidateRefreshTokenAuthResponseProps> {
    const { refreshToken, meta } = request;

    const [tokenUuid, rawToken] = refreshToken.split('.');
    if (!tokenUuid || !rawToken) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Invalid refresh token format. Expected: {tokenUuid}.{rawToken}',
      );
    }

    await this.validateFromRedis(tokenUuid, rawToken);

    const storedToken = await this.validateFromDatabase(tokenUuid, rawToken);

    const user = await this.findByUuidUserService.execute(storedToken.userUuid);
    if (!user) {
      throw new NotFoundException(CONTEXT_AUTH.VALIDATE_TOKEN);
    }

    const [{ accessToken }, refresh_token_new] = await Promise.all([
      this.generateAccessTokenUseCase.execute({
        userUuid: user.uuid,
        email: user.email,
        role: user.role,
      }),
      this.rotateTokens(tokenUuid, storedToken.userUuid, meta),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refresh_token_new,
    };
  }

  // ─── Camada Redis ────────────────────────────────────────────────

  private async validateFromRedis(
    tokenUuid: string,
    rawToken: string,
  ): Promise<void> {
    const key = REDIS_KEYS.refreshToken('*', tokenUuid);
    const storedHash = await this.redisService.get(key);

    if (!storedHash) return;

    const isValid = await bcrypt.compare(rawToken, storedHash);
    if (!isValid) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Invalid refresh token',
      );
    }
  }

  // ─── Camada Banco ────────────────────────────────────────────────

  private async validateFromDatabase(tokenUuid: string, rawToken: string) {
    const storedToken =
      await this.authRepository.findRefreshTokenByUuid(tokenUuid);

    if (!storedToken) {
      throw new NotFoundException(CONTEXT_AUTH.VALIDATE_TOKEN);
    }

    if (storedToken.revoked) {
      // Token revogado sendo reutilizado — possível ataque, invalida tudo
      await this.revokeAllUserSessionsUseCase.execute({
        userUuid: storedToken.userUuid,
      });
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Refresh token has been revoked',
      );
    }

    if (new Date() > new Date(storedToken.expiresAt)) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Refresh token has expired',
      );
    }

    const tokenMatches = await this.compareBcryptService.execute(
      rawToken,
      storedToken.tokenHash,
    );

    if (!tokenMatches) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Invalid refresh token',
      );
    }

    return storedToken;
  }

  // ─── Rotação ─────────────────────────────────────────────────────

  private async rotateTokens(
    oldTokenUuid: string,
    userUuid: string,
    meta: ValidateRefreshTokenAuthRequestProps['meta'],
  ): Promise<string> {
    await Promise.all([
      this.authRepository.revokeRefreshToken(oldTokenUuid),
      this.revokeRefreshTokenUseCase.execute({
        userUuid,
        jti: oldTokenUuid,
      }),
    ]);

    return this.createRefreshTokenService.execute(userUuid, meta);
  }
}
