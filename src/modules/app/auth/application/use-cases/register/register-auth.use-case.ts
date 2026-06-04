import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { CreateUserUseCase } from '@/src/modules/app/users/application/use-cases/create/create-user.use-case';
import { GenerateAccessTokenUseCase } from '@/src/modules/shared/jwt/application/services/generate-access-token/generate-access-token.use-case';
import { Injectable } from '@nestjs/common';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { CreateRefreshTokenService } from '../../services/create-refresh-token/create-refresh-token.service';
import type {
  RegisterAuthRequestProps,
  RegisterAuthResponseProps,
} from './types';

@Injectable()
export class RegisterAuthUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly createRefreshTokenService: CreateRefreshTokenService,
  ) {}

  async execute(
    request: RegisterAuthRequestProps,
  ): Promise<RegisterAuthResponseProps> {
    const created = await this.createUserUseCase.execute(request);

    if (!created) {
      throw new BadRequestException(
        CONTEXT_AUTH.REGISTER,
        'Error creating user',
      );
    }

    const [{ accessToken }, refreshToken] = await Promise.all([
      this.generateAccessTokenUseCase.execute({
        userUuid: created.uuid,
        email: created.email,
        role: created.role,
      }),
      this.createRefreshTokenService.execute(created.uuid, request.meta),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
