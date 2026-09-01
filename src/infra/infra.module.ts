import { Module } from '@nestjs/common';

import { EnvModule } from '../core/env/env.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';

const modules = [EnvModule, DatabaseModule, RedisModule];

@Module({
  imports: modules,
  exports: modules,
})
export class InfraModule {}
