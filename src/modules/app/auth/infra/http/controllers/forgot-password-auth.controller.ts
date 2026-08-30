import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import { ForgotPasswordAuthUseCase } from '@/src/modules/app/auth/application/use-cases/forgot-password/forgot-password-auth.use-case';
import {
  ForgotPasswordAuthRequestDto,
  ForgotPasswordAuthResponseDto,
} from '@/src/modules/app/auth/dtos';

@AppController('Auth', '1')
export class ForgotPasswordAuthController {
  constructor(private readonly useCase: ForgotPasswordAuthUseCase) {}

  @AppPost({
    path: 'forgot-password',
    summary: 'Generate password reset url for user',
    body: ForgotPasswordAuthRequestDto,
    okResponse: ForgotPasswordAuthResponseDto,
  })
  async handle(@Body() body: ForgotPasswordAuthRequestDto) {
    return this.useCase.execute(body);
  }
}
