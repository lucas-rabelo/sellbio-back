// validate-refresh-token.use-case.ts
import { REDIS_KEYS } from '@/src/infra/redis/constants';
import { RedisService } from '@/src/infra/redis/services/redis.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshTokenPayload } from '../generate-refresh-token/types';
import { RevokeAllUserSessionsUseCase } from '../revoke-all-user-sessions/revoke-all-user-sessions.use-case';
import { ValidateRefreshTokenInput, ValidateRefreshTokenOutput } from './types';

@Injectable()
export class ValidateRefreshTokenUseCase {
  private readonly logger = new Logger(ValidateRefreshTokenUseCase.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly revokeAllUserSessionsUseCase: RevokeAllUserSessionsUseCase,
  ) { }

  async execute(input: ValidateRefreshTokenInput): Promise<ValidateRefreshTokenOutput> {
    const { token } = input;

    let payload: RefreshTokenPayload;
    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    const key = REDIS_KEYS.refreshToken(payload.sub, payload.jti);
    const storedHash = await this.redisService.get(key);

    if (!storedHash) {
      throw new UnauthorizedException('Sessão expirada, faça login novamente');
    }

    const isValid = await bcrypt.compare(token, storedHash);
    if (!isValid) {
      this.logger.warn(`Possível roubo de token detectado: userUuid=${payload.sub}`);
      await this.revokeAllUserSessionsUseCase.execute({ userUuid: payload.sub });
      throw new UnauthorizedException('Sessão inválida, faça login novamente');
    }

    return { userUuid: payload.sub, jti: payload.jti };
  }
}