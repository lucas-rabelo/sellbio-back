import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import { LoginAuthUseCase } from '@/src/modules/app/auth/application/use-cases/login/login-auth.use-case';
import {
  LoginAuthRequestDto,
  LoginAuthResponseDto,
} from '@/src/modules/app/auth/dtos/login-auth.dto';

@AppController('Auth', '1')
export class LoginAuthController {
  constructor(private readonly useCase: LoginAuthUseCase) {}

  @AppPost({
    path: 'login',
    summary: 'Authenticate user and return tokens',
    body: LoginAuthRequestDto,
    okResponse: LoginAuthResponseDto,
  })
  async handle(@Body() body: LoginAuthRequestDto) {
    return this.useCase.execute(body);
  }
}
