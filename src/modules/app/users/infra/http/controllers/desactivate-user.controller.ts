import { HTTP_STATUS } from '@/src/core';
import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPatch } from '@/src/infra/decorators/base/patch.decorator';
import { Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/src/infra/guards/auth/auth.guard';
import { DeactivateUserUseCase } from '../../../application/use-cases/deactivate/deactivate-user.use-case';
import type { DeactivateUserRequestProps } from '../../../application/use-cases/deactivate/types';

@AppController('Users', '1', true)
@UseGuards(AuthGuard)
export class DeactivateUserController {
  constructor(private readonly useCase: DeactivateUserUseCase) {}

  @AppPatch({
    path: 'deactivate/:userUuid',
    summary: 'Deactivate user of the application',
    httpCode: HTTP_STATUS.NO_CONTENT,
  })
  async handle(
    @Param('userUuid', ParseUUIDPipe) userUuid: DeactivateUserRequestProps,
  ) {
    return this.useCase.execute(userUuid);
  }
}
