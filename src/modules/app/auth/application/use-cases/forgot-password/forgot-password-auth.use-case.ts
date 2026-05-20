import type { EnvSchema } from '@/src/core';
import { InternalServerErrorException } from '@/src/core/exceptions/internal-server-error.exception';
import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { FindByEmailUserService } from '@/src/modules/app/users/application/services/find-by-email/find-by-email-user.service';
import { CreateTokenJwtService } from '@/src/modules/shared/jwt/application/services/create-token/create-token-jwt.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT_AUTH } from '../../../application/constants/contexts';
import type {
  ForgotPasswordAuthRequestProps,
  ForgotPasswordAuthResponseProps,
} from './types';

@Injectable()
export class ForgotPasswordAuthUseCase {
  constructor(
    private readonly configService: ConfigService<EnvSchema>,
    private readonly findByEmailUserService: FindByEmailUserService,
    private readonly createTokenJwtService: CreateTokenJwtService,
  ) { }

  async execute(
    request: ForgotPasswordAuthRequestProps,
  ): Promise<ForgotPasswordAuthResponseProps> {
    const user = await this.findByEmailUserService.execute(request.email);

    if (!user) {
      throw new NotFoundException(CONTEXT_AUTH.FORGOT_PASSWORD);
    }

    const { token: access_token } = await this.createTokenJwtService.execute({
      user,
      options: { expiresIn: '15 minutes' },
    });

    const frontend: string | undefined = this.configService.get('FRONT_END_URL');
    if (!frontend) {
      throw new InternalServerErrorException(
        CONTEXT_AUTH.FORGOT_PASSWORD, 
        'Frontend URL is not configured'
      );
    }

    const url = `${frontend}/reset-password?token=${access_token}`;
    return { url };
  }
}
