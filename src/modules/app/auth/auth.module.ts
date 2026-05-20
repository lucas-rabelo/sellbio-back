import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/src/infra';

import { JwtModule } from '../../shared/jwt/jwt.module';
import { BcryptModule } from '../../shared/bcrypt/bcrypt.module';
import { UsersModule } from '../users/users.module';

import { AuthRepository } from './infra/http/database/auth.repository';
import { AuthRepositoryTypeorm } from './infra/http/database/typeorm/repositories/auth-repository.typeorm';

import { CreateRefreshTokenService } from './application/services/create-refresh-token/create-refresh-token.service';

import { RegisterAuthUseCase } from './application/use-cases/register/register-auth.use-case';
import { LoginAuthUseCase } from './application/use-cases/login/login-auth.use-case';
import { ForgotPasswordAuthUseCase } from './application/use-cases/forgot-password/forgot-password-auth.use-case';
import { ResetPasswordAuthUseCase } from './application/use-cases/reset-password/reset-password-auth.use-case';
import { ValidateTokenAuthUseCase } from './application/use-cases/validate-token/validate-token-auth.use-case';

import { RegisterAuthController } from './infra/http/controllers/register-auth.controller';
import { LoginAuthController } from './infra/http/controllers/login-auth.controller';
import { ForgotPasswordAuthController } from './infra/http/controllers/forgot-password-auth.controller';
import { ResetPasswordAuthController } from './infra/http/controllers/reset-password-auth.controller';
import { ValidateTokenAuthController } from './infra/http/controllers/validate-token-auth.controller';

@Module({
  imports: [DatabaseModule, JwtModule, BcryptModule, UsersModule],
  providers: [
    RegisterAuthUseCase,
    LoginAuthUseCase,
    ForgotPasswordAuthUseCase,
    ResetPasswordAuthUseCase,
    ValidateTokenAuthUseCase,
    CreateRefreshTokenService,
    {
      provide: AuthRepository,
      useClass: AuthRepositoryTypeorm,
    },
  ],
  controllers: [
    RegisterAuthController,
    LoginAuthController,
    ForgotPasswordAuthController,
    ResetPasswordAuthController,
    ValidateTokenAuthController,
  ],
  exports: [],
})
export class AuthModule {}
