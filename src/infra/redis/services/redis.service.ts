// redis/redis.service.ts
import { Injectable, Inject, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../constants';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
    this.logger.log('Conexão Redis encerrada');
  }

  // ─── Operações básicas ───────────────────────────────────────────

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  // Retorna o TTL restante em segundos (-1 = sem expiração, -2 = não existe)
  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  // ─── Operações para autenticação ─────────────────────────────────

  async setWithTtl(
    key: string,
    value: string,
    ttlSeconds: number,
  ): Promise<void> {
    await this.client.set(key, value, 'EX', ttlSeconds);
  }

  // Deleta todas as sessões de um usuário (logout de todos os dispositivos)
  async deletePattern(pattern: string): Promise<number> {
    const keys = await this.client.keys(pattern);

    if (keys.length === 0) return 0;

    // Pipeline executa todos os DELs em uma única roundtrip ao Redis
    const pipeline = this.client.pipeline();
    keys.forEach((key) => pipeline.del(key));
    await pipeline.exec();

    return keys.length;
  }

  // ─── Health check ────────────────────────────────────────────────

  async ping(): Promise<boolean> {
    try {
      const result = await this.client.ping();
      return result === 'PONG';
    } catch {
      return false;
    }
  }
}
