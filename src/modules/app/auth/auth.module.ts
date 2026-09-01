import { DatabaseModule } from '@/src/infra';
import { Module } from '@nestjs/common';

import { BcryptModule } from '../../shared/bcrypt/bcrypt.module';
import { JwtModule } from '../../shared/jwt/jwt.module';
import { UsersModule } from '../users/users.module';

import { AuthRepository } from './infra/http/database/auth.repository';
import { AuthRepositoryTypeorm } from './infra/http/database/typeorm/repositories/auth-repository.typeorm';

import { CreateRefreshTokenService } from './application/services/create-refresh-token/create-refresh-token.service';

import { ForgotPasswordAuthUseCase } from './application/use-cases/forgot-password/forgot-password-auth.use-case';
import { LoginAuthUseCase } from './application/use-cases/login/login-auth.use-case';
import { LogoutAuthUseCase } from './application/use-cases/logout/logout-auth.use-case';
import { RegisterAuthUseCase } from './application/use-cases/register/register-auth.use-case';
import { ResetPasswordAuthUseCase } from './application/use-cases/reset-password/reset-password-auth.use-case';
import { ValidateRefreshTokenAuthUseCase } from './application/use-cases/validate-refresh-token/validate-refresh-token-auth.use-case';
import { ValidateTokenAuthUseCase } from './application/use-cases/validate-token/validate-token-auth.use-case';

import { ForgotPasswordAuthController } from './infra/http/controllers/forgot-password-auth.controller';
import { LoginAuthController } from './infra/http/controllers/login-auth.controller';
import { LogoutAuthController } from './infra/http/controllers/logout-auth.controller';
import { RegisterAuthController } from './infra/http/controllers/register-auth.controller';
import { ResetPasswordAuthController } from './infra/http/controllers/reset-password-auth.controller';
import { ValidateRefreshTokenAuthController } from './infra/http/controllers/validate-refresh-token-auth.controller';
import { ValidateTokenAuthController } from './infra/http/controllers/validate-token-auth.controller';

@Module({
  imports: [DatabaseModule, JwtModule, BcryptModule, UsersModule],
  providers: [
    RegisterAuthUseCase,
    LoginAuthUseCase,
    LogoutAuthUseCase,
    ForgotPasswordAuthUseCase,
    ResetPasswordAuthUseCase,
    ValidateTokenAuthUseCase,
    ValidateRefreshTokenAuthUseCase,
    CreateRefreshTokenService,
    {
      provide: AuthRepository,
      useClass: AuthRepositoryTypeorm,
    },
  ],
  controllers: [
    RegisterAuthController,
    LoginAuthController,
    LogoutAuthController,
    ForgotPasswordAuthController,
    ResetPasswordAuthController,
    ValidateTokenAuthController,
    ValidateRefreshTokenAuthController,
  ],
  exports: [],
})
export class AuthModule {}
