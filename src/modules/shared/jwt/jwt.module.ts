import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { CreateTokenJwtService } from './application/services/create-token';
import { ValidateTokenJwtService } from './application/services/validate-token';

@Module({
  imports: [
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
  providers: [CreateTokenJwtService, ValidateTokenJwtService],
  exports: [CreateTokenJwtService, ValidateTokenJwtService],
})
export class JwtModule {}
