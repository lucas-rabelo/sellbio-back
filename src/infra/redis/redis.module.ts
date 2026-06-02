// redis/redis.module.ts
import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import type { EnvSchema } from '@/src/core';

import { REDIS_CLIENT } from './constants';

import { RedisService } from './services/redis.service';

import { HealthCheckController } from './controllers/health-check.controller';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvSchema>): Redis => {
        const logger = new Logger('RedisModule');

        const client = new Redis({
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB', 0),
          retryStrategy(times) {
            if (times > 10) return null;
            return Math.min(times * 200, 3000);
          },
        });

        client.on('connect', () => logger.log('Redis conectado ✓'));
        client.on('ready', () => logger.log('Redis pronto para comandos ✓'));
        client.on('error', (err) => logger.error('Redis erro:', err.message));
        client.on('close', () => logger.warn('Redis conexão fechada'));
        client.on('reconnecting', () => logger.warn('Redis reconectando...'));

        return client;
      },
    },
    RedisService,
  ],
  controllers: [HealthCheckController],
  exports: [RedisService],
})
export class RedisModule {}
