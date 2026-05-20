import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import { RegisterAuthUseCase } from '@/src/modules/app/auth/application/use-cases/register/register-auth.use-case';
import {
  RegisterAuthRequestDto,
  RegisterAuthResponseDto,
} from '@/src/modules/app/auth/dtos/register-auth.dto';

@AppController('Auth', '1')
export class RegisterAuthController {
  constructor(private readonly useCase: RegisterAuthUseCase) {}

  @AppPost({
    path: 'register',
    summary: 'Register new user and return tokens',
    body: RegisterAuthRequestDto,
    okResponse: RegisterAuthResponseDto,
  })
  async handle(@Body() body: RegisterAuthRequestDto) {
    return this.useCase.execute(body);
  }
}
