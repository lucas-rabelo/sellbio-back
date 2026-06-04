import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import type { AuthenticatedRequest } from '@/src/core/types/user-decorator';
import { Meta } from '@/src/infra/decorators/meta.decorator';
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
  async handle(
    @Body() body: LoginAuthRequestDto,
    @Meta() { meta }: AuthenticatedRequest,
  ) {
    return this.useCase.execute({ ...body, meta });
  }
}
