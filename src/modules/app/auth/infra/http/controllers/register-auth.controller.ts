import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import type { AuthenticatedRequest } from '@/src/core/types/user-decorator';
import { Meta } from '@/src/infra/decorators/meta.decorator';
import { RegisterAuthUseCase } from '@/src/modules/app/auth/application/use-cases/register/register-auth.use-case';
import {
  RegisterAuthRequestDto,
  RegisterAuthResponseDto,
} from '@/src/modules/app/auth/dtos';

@AppController('Auth', '1')
export class RegisterAuthController {
  constructor(private readonly useCase: RegisterAuthUseCase) {}

  @AppPost({
    path: 'register',
    summary: 'Register new user and return tokens',
    body: RegisterAuthRequestDto,
    okResponse: RegisterAuthResponseDto,
  })
  async handle(
    @Body() body: RegisterAuthRequestDto,
    @Meta() { meta }: AuthenticatedRequest,
  ) {
    return this.useCase.execute({ ...body, meta });
  }
}
