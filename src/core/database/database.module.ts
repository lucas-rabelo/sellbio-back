import { EnvService } from '@/core/env';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => {
        const isLocal = env.isDevelopment();

        const user = env.get('DATABASE_USER');
        const pass = env.get('DATABASE_PASS');
        const host = env.get('DATABASE_HOST');
        const port = env.get('DATABASE_PORT');
        const name = env.get('DATABASE_NAME');

        return {
          type: 'postgres',
          url: `postgresql://${user}:${pass}@${host}:${port}/${name}`,
          autoLoadEntities: true,
          synchronize: false,
          logging: isLocal,
          ssl: false,
        };
      },
    }),
  ],
})
export class DatabaseModule { }