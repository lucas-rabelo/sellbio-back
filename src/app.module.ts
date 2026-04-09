import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/core/database';
import { EnvModule } from '@/core/env';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
  ],
})
export class AppModule {}