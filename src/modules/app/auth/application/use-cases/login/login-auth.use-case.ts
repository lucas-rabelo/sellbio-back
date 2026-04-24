import { BadRequestException } from "@/core/exceptions/bad-request.exception";
import { FindByEmailUserService } from "@/modules/app/users/application/services/find-by-email/find-by-email-user.service";
import { Injectable } from "@nestjs/common";
import { CONTEXT_AUTH } from "../../constants/contexts";
import { ComparePasswordAuthService } from "../../services/compare-password/compare-password-auth.service";
import { CreateAccessTokenJwtAuthService } from "../../services/create-access-token/create-access-token-jwt-auth.service";
import { CreateRefreshTokenJwtAuthService } from "../../services/create-refresh-token/create-refresh-token-jwt-auth.service";
import { ValidateTokenJwtAuthService } from "../../services/validate-token-jwt/validate-token-jwt-auth.service";
import type { LoginAuthRequestProps, LoginAuthResponseProps } from "./types";

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly findByEmailUserService: FindByEmailUserService,
    private readonly comparePasswordAuthService: ComparePasswordAuthService,
    private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
    private readonly createAccessTokenJwtAuthService: CreateAccessTokenJwtAuthService,
    private readonly createRefreshTokenJwtAuthService: CreateRefreshTokenJwtAuthService,
  ) { }

  async execute({ email, password }: LoginAuthRequestProps): Promise<LoginAuthResponseProps> {
    const userEmailFounded = await this.findByEmailUserService.execute(email);

    if (!userEmailFounded) {
      throw new BadRequestException(CONTEXT_AUTH.LOGIN, 'Invalid email or password');
    }

    const isPasswordValid = await this.comparePasswordAuthService.execute(password, userEmailFounded.passwordHash);

    if (!isPasswordValid) {
      throw new BadRequestException(CONTEXT_AUTH.LOGIN, 'Invalid email or password');
    }

    const { accessToken } = this.createAccessTokenJwtAuthService.execute(userEmailFounded);
    const { refreshToken } = await this.createRefreshTokenJwtAuthService.execute(userEmailFounded);

    const validateAccessToken = await this.validateTokenJwtAuthService.execute({ token: accessToken, options: {} });
    const validateRefreshToken = await this.validateTokenJwtAuthService.execute({ token: refreshToken, options: {} });

    if (!validateAccessToken || !validateRefreshToken) {
      throw new BadRequestException(CONTEXT_AUTH.LOGIN, 'Error in creation of the token');
    }

    return {
      accessToken,
      refreshToken,
    };
  }
}