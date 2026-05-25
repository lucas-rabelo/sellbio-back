import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { CreateUserUseCase } from '@/src/modules/app/users/application/use-cases/create/create-user.use-case';
import { CreateTokenJwtService } from '@/src/modules/shared/jwt/application/services/create-token/create-token-jwt.service';
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
    private readonly createTokenJwtService: CreateTokenJwtService,
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

    const { token: access_token } = await this.createTokenJwtService.execute({
      user: created,
      options: { expiresIn: '30 minutes' },
    });

    const refresh_token = await this.createRefreshTokenService.execute(
      created.uuid,
    );

    return {
      access_token,
      refresh_token,
    };
  }
}
