import { REDIS_KEYS } from '@/src/infra/redis/constants';
import { RedisService } from '@/src/infra/redis/services/redis.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { JWT_CONSTANTS } from '../../constants/parameters';
import {
  GenerateRefreshTokenInput,
  GenerateRefreshTokenOutput,
} from './types';

@Injectable()
export class GenerateRefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) { }

  async execute(input: GenerateRefreshTokenInput): Promise<GenerateRefreshTokenOutput> {
    const { userUuid } = input;
    const jti = randomUUID();

    const refreshToken = await this.jwtService.signAsync(
      { sub: userUuid, jti },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: JWT_CONSTANTS.REFRESH_TOKEN_TTL,
      },
    );

    const tokenHash = await bcrypt.hash(refreshToken, JWT_CONSTANTS.BCRYPT_SALT_ROUNDS);
    const key = REDIS_KEYS.refreshToken(userUuid, jti);

    await this.redisService.setWithTtl(key, tokenHash, JWT_CONSTANTS.REFRESH_TOKEN_TTL_SECONDS);

    return { refreshToken };
  }
}