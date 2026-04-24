import { BadRequestException } from "@/core/exceptions/bad-request.exception";
import { CreateUserUseCase } from "@/modules/app/users/application/use-cases/create/create-user.use-case";
import { Injectable } from "@nestjs/common";
import { CONTEXT_AUTH } from "../../constants/contexts";
import { CreateAccessTokenJwtAuthService } from "../../services/create-access-token/create-access-token-jwt-auth.service";
import { CreateRefreshTokenJwtAuthService } from "../../services/create-refresh-token/create-refresh-token-jwt-auth.service";
import { ValidateTokenJwtAuthService } from "../../services/validate-token-jwt/validate-token-jwt-auth.service";
import type { RegisterAuthRequestProps, RegisterAuthResponseProps } from "./types";

@Injectable()
export class RegisterAuthUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
    private readonly createAccessTokenJwtAuthService: CreateAccessTokenJwtAuthService,
    private readonly createRefreshTokenJwtAuthService: CreateRefreshTokenJwtAuthService,
  ) { }

  async execute(request: RegisterAuthRequestProps): Promise<RegisterAuthResponseProps> {
    const user = await this.createUserUseCase.execute(request);

    const { accessToken } = this.createAccessTokenJwtAuthService.execute(user);
    const { refreshToken } = await this.createRefreshTokenJwtAuthService.execute(user);

    const validateAccessToken = await this.validateTokenJwtAuthService.execute({ token: accessToken, options: {} });
    const validateRefreshToken = await this.validateTokenJwtAuthService.execute({ token: refreshToken, options: {} });

    if (!validateAccessToken || !validateRefreshToken) {
      throw new BadRequestException(CONTEXT_AUTH.REGISTER, 'Error in creation of the token');
    }

    return {
      accessToken,
      refreshToken,
    };
  };
}