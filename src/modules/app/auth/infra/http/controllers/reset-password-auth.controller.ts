import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import type { AuthenticatedRequest } from '@/src/core/types/user-decorator';
import { Meta } from '@/src/infra/decorators/meta.decorator';
import { ResetPasswordAuthUseCase } from '@/src/modules/app/auth/application/use-cases/reset-password/reset-password-auth.use-case';
import {
  ResetPasswordAuthRequestDto,
  ResetPasswordAuthResponseDto,
} from '@/src/modules/app/auth/dtos/reset-password-auth.dto';

@AppController('Auth', '1')
export class ResetPasswordAuthController {
  constructor(private readonly useCase: ResetPasswordAuthUseCase) {}

  @AppPost({
    path: 'reset-password',
    summary: 'Reset user password using token',
    body: ResetPasswordAuthRequestDto,
    okResponse: ResetPasswordAuthResponseDto,
  })
  async handle(
    @Body() body: ResetPasswordAuthRequestDto,
    @Meta() { meta }: AuthenticatedRequest,
  ) {
    return this.useCase.execute({ ...body, meta });
  }
}
