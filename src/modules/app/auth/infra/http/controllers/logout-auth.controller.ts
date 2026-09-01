import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body, Headers, UseGuards } from '@nestjs/common';

import { LogoutAuthUseCase } from '@/src/modules/app/auth/application/use-cases/logout/logout-auth.use-case';
import { LogoutAuthRequestDto } from '@/src/modules/app/auth/dtos';
import { User } from '@/src/infra/decorators/user.decorator';
import type { AuthenticatedRequest } from '@/src/core/types/user-decorator';
import { AuthGuard } from '@/src/infra/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@AppController('Auth', '1', true)
export class LogoutAuthController {
  constructor(private readonly useCase: LogoutAuthUseCase) {}

  @AppPost({
    path: 'logout',
    summary: 'Logout user and revoke all refresh tokens',
    body: LogoutAuthRequestDto,
  })
  async handle(
    @Body() body: LogoutAuthRequestDto,
    @User() { user }: AuthenticatedRequest,
  ) {
    return this.useCase.execute({
      userUuid: user.uuid,
      refreshToken: body.refreshToken,
    });
  }
}
