import { REDIS_KEYS } from '@/src/infra/redis/constants';
import { RedisService } from '@/src/infra/redis/services/redis.service';
import { Injectable, Logger } from '@nestjs/common';
import { RevokeAllUserSessionsInput, RevokeAllUserSessionsOutput } from './types';

@Injectable()
export class RevokeAllUserSessionsUseCase {
  private readonly logger = new Logger(RevokeAllUserSessionsUseCase.name);

  constructor(private readonly redisService: RedisService) { }

  async execute(input: RevokeAllUserSessionsInput): Promise<RevokeAllUserSessionsOutput> {
    const { userUuid } = input;
    const pattern = REDIS_KEYS.refreshToken(userUuid, '*');
    const deletedSessions = await this.redisService.deletePattern(pattern);

    this.logger.log(`${deletedSessions} sessões revogadas para userUuid=${userUuid}`);

    return { deletedSessions };
  }
}