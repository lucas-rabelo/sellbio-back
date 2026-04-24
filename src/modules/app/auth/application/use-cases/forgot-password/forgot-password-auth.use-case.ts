import { BadRequestException } from '@/app/core/exceptions/bad-request.exception';
import { FindByEmailUserService } from '@/app/modules/app/users/application/services/find-by-email/find-by-email-user.service';
import { Injectable } from '@nestjs/common';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { CreateAccessTokenJwtAuthService } from '../../services/create-access-token/create-access-token-jwt-auth.service';
import type { ForgotPasswordAuthRequestProps, ForgotPasswordAuthResponseProps } from './types';

@Injectable()
export class ForgotPasswordAuthUseCase {
  constructor(
    private readonly findByEmailUserService: FindByEmailUserService,
    private readonly createAccessTokenJwtService: CreateAccessTokenJwtAuthService,
  ) { }

  async execute(
    request: ForgotPasswordAuthRequestProps,
  ): Promise<ForgotPasswordAuthResponseProps> {
    const userFounded = await this.findByEmailUserService.execute(request.email);

    if (!userFounded) {
      throw new BadRequestException(CONTEXT_AUTH.FORGOT_PASSWORD, 'User not found with this email');
    }

    const { accessToken } = this.createAccessTokenJwtService.execute(userFounded);

    return {
      link: `${process.env.FRONT_BASE_URL}?token=${accessToken}`,
    };
  }
}