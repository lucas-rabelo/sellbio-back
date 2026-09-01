import { EnvService } from '@/src/core/env';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersEntity, RefreshTokenEntity } from './entities';

const entities = [UsersEntity, RefreshTokenEntity];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => {
        const isLocal = env.isDevelopment();

        return {
          type: 'postgres',
          url: env.urlDatabase(),
          autoLoadEntities: true,
          synchronize: false,
          logging: isLocal,
          ssl: false,
        };
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
