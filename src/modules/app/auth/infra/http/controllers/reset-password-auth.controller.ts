import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

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
  async handle(@Body() body: ResetPasswordAuthRequestDto) {
    return this.useCase.execute(body);
  }
}
