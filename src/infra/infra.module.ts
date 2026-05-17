import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { EnvModule } from '../core/env/env.module';

@Module({
  imports: [EnvModule, DatabaseModule],
  exports: [EnvModule, DatabaseModule],
})
export class InfraModule {}
