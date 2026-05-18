import { Module } from '@nestjs/common';

import { JwtModule } from '../../shared/jwt/jwt.module';
import { BcryptModule } from '../../shared/bcrypt/bcrypt.module';

import { AuthRepository } from './infra/http/database/auth.repository';
import { AuthRepositoryTypeorm } from './infra/http/database/typeorm/repositories/auth-repository.typeorm';

@Module({
  imports: [JwtModule, BcryptModule],
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthRepositoryTypeorm,
    },
  ],
  exports: [],
})
export class AuthModule {}
