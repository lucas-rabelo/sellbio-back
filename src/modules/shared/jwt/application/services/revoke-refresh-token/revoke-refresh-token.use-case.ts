// revoke-refresh-token.use-case.ts
import { REDIS_KEYS } from '@/src/infra/redis/constants';
import { RedisService } from '@/src/infra/redis/services/redis.service';
import { Injectable } from '@nestjs/common';
import { RevokeRefreshTokenInput } from './types';

@Injectable()
export class RevokeRefreshTokenUseCase {
  constructor(private readonly redisService: RedisService) {}

  async execute(input: RevokeRefreshTokenInput): Promise<void> {
    const { userUuid, jti } = input;
    const key = REDIS_KEYS.refreshToken(userUuid, jti);
    await this.redisService.del(key);
  }
}
