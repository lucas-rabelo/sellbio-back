import { Module } from '@nestjs/common';
import { InfraModule } from '@/src/infra/infra.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const entities = [InfraModule, UsersModule, AuthModule];

@Module({
  imports: entities,
  exports: entities,
})
export class AppplicationModule {}
