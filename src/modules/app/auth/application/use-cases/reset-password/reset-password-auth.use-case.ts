import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { UpdateUserUseCase } from '@/src/modules/app/users/application/use-cases/update/update-user.use-case';
import { GenerateAccessTokenUseCase } from '@/src/modules/shared/jwt/application/services/generate-access-token/generate-access-token.use-case';
import { ValidateAccessTokenUseCase } from '@/src/modules/shared/jwt/application/services/validate-access-token/validate-access-token.use-case';
import { Injectable } from '@nestjs/common';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { CreateRefreshTokenService } from '../../services/create-refresh-token/create-refresh-token.service';
import type {
  ResetPasswordAuthRequestProps,
  ResetPasswordAuthResponseProps,
} from './types';

@Injectable()
export class ResetPasswordAuthUseCase {
  constructor(
    private readonly validateAccessTokenUseCase: ValidateAccessTokenUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly createRefreshTokenService: CreateRefreshTokenService,
  ) {}

  async execute(
    request: ResetPasswordAuthRequestProps,
  ): Promise<ResetPasswordAuthResponseProps> {
    const { token, password, confirmPassword, meta } = request;

    const { userUuid, email, role } =
      await this.validateAccessTokenUseCase.execute({ token });

    const user = await this.updateUserUseCase.execute({
      userUuid,
      body: { password, confirmPassword },
    });

    if (!user) {
      throw new NotFoundException(CONTEXT_AUTH.RESET_PASSWORD);
    }

    const [{ accessToken }, refreshToken] = await Promise.all([
      this.generateAccessTokenUseCase.execute({ userUuid, email, role }),
      this.createRefreshTokenService.execute(userUuid, meta),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
