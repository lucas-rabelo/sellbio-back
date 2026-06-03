import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { GenerateAccessTokenUseCase } from './application/services/generate-access-token/generate-access-token.use-case';
import { GenerateRefreshTokenUseCase } from './application/services/generate-refresh-token/generate-refresh-token.use-case';
import { RevokeAllUserSessionsUseCase } from './application/services/revoke-all-user-sessions/revoke-all-user-sessions.use-case';
import { RevokeRefreshTokenUseCase } from './application/services/revoke-refresh-token/revoke-refresh-token.use-case';
import { RotateRefreshTokenUseCase } from './application/services/rotate-refresh-token/rotate-refresh-token.use-case';
import { ValidateRefreshTokenUseCase } from './application/services/validate-refresh-token/validate-refresh-token.use-case';
import { ValidateAccessTokenUseCase } from './application/services/validate-access-token/validate-access-token.use-case';
import { RedisModule } from '@/src/infra/redis/redis.module';

const services = [
  GenerateAccessTokenUseCase,
  GenerateRefreshTokenUseCase,
  RevokeAllUserSessionsUseCase,
  RevokeRefreshTokenUseCase,
  RotateRefreshTokenUseCase,
  ValidateRefreshTokenUseCase,
  ValidateAccessTokenUseCase,
];

@Module({
  imports: [
    RedisModule,
    ConfigModule.forRoot({ isGlobal: true }),
    NestJwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECRET_ENV'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: services,
  exports: services,
})
export class JwtModule {}
