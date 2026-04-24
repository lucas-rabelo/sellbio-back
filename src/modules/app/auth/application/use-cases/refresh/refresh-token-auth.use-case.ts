import { BadRequestException } from '@/app/core/exceptions/bad-request.exception';
import { Injectable, Inject } from '@nestjs/common';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { ValidateTokenJwtAuthService } from '../../services/validate-token-jwt/validate-token-jwt-auth.service';
import { FindByUuidUserService } from '@/app/modules/app/users/application/services/find-by-uuid/find-by-uuid-user.service';
import { ComparePasswordAuthService } from '../../services/compare-password/compare-password-auth.service';
import { CreateAccessTokenJwtAuthService } from '../../services/create-access-token/create-access-token-jwt-auth.service';
import { CreateRefreshTokenJwtAuthService } from '../../services/create-refresh-token/create-refresh-token-jwt-auth.service';
import { UpdateUserUseCase } from '@/app/modules/app/users/application/use-cases/update/update-user.use-case';
import type { RefreshAuthRequestProps, RefreshAuthResponseProps } from './types';
import type Redis from 'ioredis';
import { REDIS_CLIENT } from '@/infra/redis/redis.module';

@Injectable()
export class RefreshTokenAuthUseCase {
  constructor(
    private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
    private readonly findByUuidUserService: FindByUuidUserService,
    private readonly comparePasswordAuthService: ComparePasswordAuthService,
    private readonly createAccessTokenJwtAuthService: CreateAccessTokenJwtAuthService,
    private readonly createRefreshTokenJwtAuthService: CreateRefreshTokenJwtAuthService,
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(REDIS_CLIENT) private readonly redisClient?: Redis,
  ) { }

  async execute({ refreshToken }: RefreshAuthRequestProps): Promise<RefreshAuthResponseProps> {
    let data: any;

    try {
      data = await this.validateTokenJwtAuthService.execute({ token: refreshToken, options: {} });
    } catch (err) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid token');
    }

    if (!data) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid token');
    }

    const uuid = data.uuid ?? data.sub;

    const user = await this.findByUuidUserService.execute(uuid as string);

    if (!user) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid refresh token');
    }

    const redisKey = `refresh:user:${uuid}`;

    let storedHash: string | null = null;
    try {
      if (this.redisClient) storedHash = await this.redisClient.get(redisKey);
    } catch (e) {
      // ignore redis errors
    }

    const tokenHashToCompare = storedHash ?? user.refreshToken;

    if (!tokenHashToCompare) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid refresh token');
    }

    const isTokenValid = await this.comparePasswordAuthService.execute(refreshToken, tokenHashToCompare as string);

    if (!isTokenValid) {
      // Possible token reuse detected. Revoke all refresh tokens for this user.
      try {
        await this.updateUserUseCase.execute({ userUuid: uuid as string, body: { refreshToken: null } });
        if (this.redisClient) await this.redisClient.del(redisKey);
      } catch (e) {
        // ignore errors while revoking
      }

      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid refresh token');
    }

    const { accessToken } = this.createAccessTokenJwtAuthService.execute(user as any);
    const { refreshToken: newRefreshToken } = await this.createRefreshTokenJwtAuthService.execute(user as any);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
