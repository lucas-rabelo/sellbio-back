import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import { LogoutAuthUseCase } from '@/src/modules/app/auth/application/use-cases/logout/logout-auth.use-case';
import { LogoutAuthRequestDto } from '@/src/modules/app/auth/dtos/logout-auth.dto';

@AppController('Auth', '1')
export class LogoutAuthController {
  constructor(private readonly useCase: LogoutAuthUseCase) {}

  @AppPost({
    path: 'logout',
    summary: 'Logout user and revoke all refresh tokens',
    body: LogoutAuthRequestDto,
  })
  async handle(@Body() body: LogoutAuthRequestDto) {
    return this.useCase.execute(body);
  }
}
