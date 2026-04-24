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
import { REDIS_CLIENT } from '@/app/infra/redis/redis.module';
import type { CreateAccessTokenJwtAuthRequestProps } from '../../services/create-access-token/types';
import type { CreateRefreshTokenJwtAuthRequestProps } from '../../services/create-refresh-token/types';

const SEVEN_DAYS = 60 * 60 * 24 * 7; // seconds
const GRACE_SECONDS = 30; // reduced grace window

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

    const uuid = String(data.uuid ?? data.sub);

    const user = await this.findByUuidUserService.execute(uuid);

    if (!user) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid refresh token');
    }

    const redisKey = `refresh:user:${uuid}`;
    const prevKey = `${redisKey}:prev`;

    let storedCurrent: string | null = null;
    let storedPrev: string | null = null;
    try {
      if (this.redisClient) {
        const [c, p] = await this.redisClient.mget(redisKey, prevKey);
        storedCurrent = c;
        storedPrev = p;
      }
    } catch (e) {
    }

    const isCurrent = storedCurrent ? await this.comparePasswordAuthService.execute(refreshToken, storedCurrent) : false;
    const isPrev = !isCurrent && storedPrev ? await this.comparePasswordAuthService.execute(refreshToken, storedPrev) : false;

    if (!isCurrent && !isPrev) {
      try {
        await this.updateUserUseCase.execute({ userUuid: uuid, body: { refreshToken: undefined } });
        if (this.redisClient) await this.redisClient.del(redisKey, prevKey);
      } catch (e) {
      }

      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid refresh token');
    }

    if (isPrev) {
      try {
        if (this.redisClient) await this.redisClient.del(prevKey);
      } catch (e) {
      }
    }

    const userForAccess: CreateAccessTokenJwtAuthRequestProps = user;
    const userForRefresh: CreateRefreshTokenJwtAuthRequestProps = user;

    const { accessToken } = this.createAccessTokenJwtAuthService.execute(userForAccess);
    const { refreshToken: newRefreshToken } = await this.createRefreshTokenJwtAuthService.execute(userForRefresh);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
