// use-cases/forgot-password/forgot-password.use-case.ts
import type { EnvSchema } from '@/src/core';
import { InternalServerErrorException } from '@/src/core/exceptions/internal-server-error.exception';
import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { FindByEmailUserService } from '@/src/modules/app/users/application/services/find-by-email/find-by-email-user.service';
import { GenerateAccessTokenUseCase } from '@/src/modules/shared/jwt/application/services/generate-access-token/generate-access-token.use-case';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT_AUTH } from '../../constants/contexts';
import type {
  ForgotPasswordAuthRequestProps,
  ForgotPasswordAuthResponseProps,
} from './types';

@Injectable()
export class ForgotPasswordAuthUseCase {
  constructor(
    private readonly configService: ConfigService<EnvSchema>,
    private readonly findByEmailUserService: FindByEmailUserService,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
  ) {}

  async execute(
    request: ForgotPasswordAuthRequestProps,
  ): Promise<ForgotPasswordAuthResponseProps> {
    const user = await this.findByEmailUserService.execute(request.email);
    if (!user) {
      throw new NotFoundException(CONTEXT_AUTH.FORGOT_PASSWORD);
    }

    const { accessToken } = await this.generateAccessTokenUseCase.execute({
      userUuid: user.uuid,
      email: user.email,
      role: user.role,
    });

    const frontend = this.configService.get<string>('FRONT_END_URL');
    if (!frontend) {
      throw new InternalServerErrorException(
        CONTEXT_AUTH.FORGOT_PASSWORD,
        'Frontend URL is not configured',
      );
    }

    const url = `${frontend}/reset-password?token=${accessToken}`;
    return { url };
  }
}
