import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import { ValidateTokenAuthUseCase } from '@/src/modules/app/auth/application/use-cases/validate-token/validate-token-auth.use-case';
import {
  ValidadeTokenAuthRequestDto,
  ValidadeTokenAuthResponseDto,
} from '@/src/modules/app/auth/dtos';

@AppController('Auth', '1')
export class ValidateTokenAuthController {
  constructor(private readonly useCase: ValidateTokenAuthUseCase) {}

  @AppPost({
    path: 'validate-token',
    summary: 'Validate a token and return user info (for reset flow)',
    body: ValidadeTokenAuthRequestDto,
    okResponse: ValidadeTokenAuthResponseDto,
  })
  async handle(@Body() body: ValidadeTokenAuthRequestDto) {
    return this.useCase.execute(body);
  }
}
