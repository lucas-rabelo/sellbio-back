import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import type { AuthenticatedRequest } from '@/src/core/types/user-decorator';
import { Meta } from '@/src/infra/decorators/meta.decorator';
import { ValidateRefreshTokenAuthUseCase } from '@/src/modules/app/auth/application/use-cases/validate-refresh-token/validate-refresh-token-auth.use-case';
import {
  ValidateRefreshTokenAuthRequestDto,
  ValidateRefreshTokenAuthResponseDto,
} from '@/src/modules/app/auth/dtos/validate-refresh-token-auth.dto';

@AppController('Auth', '1')
export class ValidateRefreshTokenAuthController {
  constructor(private readonly useCase: ValidateRefreshTokenAuthUseCase) {}

  @AppPost({
    path: 'refresh',
    summary: 'Validate refresh token and generate new tokens',
    body: ValidateRefreshTokenAuthRequestDto,
    okResponse: ValidateRefreshTokenAuthResponseDto,
  })
  async handle(
    @Body() { refresh_token }: ValidateRefreshTokenAuthRequestDto,
    @Meta() { meta }: AuthenticatedRequest,
  ) {
    return this.useCase.execute(
      {
        refresh_token,
      },
      meta,
    );
  }
}
