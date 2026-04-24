import { forwardRef, Module } from "@nestjs/common";

import { SharedJwtModule } from "../../shared/jwt/jwt.module";
import { UsersModule } from "../users/users.module";

import { ComparePasswordAuthService } from "./application/services/compare-password/compare-password-auth.service";
import { CreateAccessTokenJwtAuthService } from "./application/services/create-access-token/create-access-token-jwt-auth.service";
import { CreateRefreshTokenJwtAuthService } from "./application/services/create-refresh-token/create-refresh-token-jwt-auth.service";
import { EncryptedPasswordAuthService } from "./application/services/encrypted-password/encrypted-password-auth.service";
import { ValidateTokenJwtAuthService } from "./application/services/validate-token-jwt/validate-token-jwt-auth.service";

import { LoginAuthUseCase } from "./application/use-cases/login/login-auth.use-case";
import { RegisterAuthUseCase } from "./application/use-cases/register/register-auth.use-case";

import { LoginAuthController } from './infra/http/controllers/login-auth.controller';
import { RegisterAuthController } from './infra/http/controllers/register-auth.controller';

@Module({
  imports: [SharedJwtModule, forwardRef(() => UsersModule)],
  providers: [
    ComparePasswordAuthService,
    CreateAccessTokenJwtAuthService,
    CreateRefreshTokenJwtAuthService,
    EncryptedPasswordAuthService,
    ValidateTokenJwtAuthService,

    LoginAuthUseCase,
    RegisterAuthUseCase,
  ],
  controllers: [
    LoginAuthController,
    RegisterAuthController,
  ],
  exports: [EncryptedPasswordAuthService],
})
export class AuthModule { }