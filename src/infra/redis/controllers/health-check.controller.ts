// infra/redis/redis.health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { RedisService } from '../services/redis.service';

@Controller('health')
export class HealthCheckController {
  constructor(private readonly redisService: RedisService) {}

  @Get('redis')
  async checkRedis() {
    const isAlive = await this.redisService.ping();
    return {
      status: isAlive ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
    };
  }
}