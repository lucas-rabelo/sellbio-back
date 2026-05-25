import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPut } from '@/src/infra/decorators/base/put.decorator';
import { UpdateUserUseCase } from '@/src/modules/app/users/application/use-cases/update/update-user.use-case';
import { Body, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/src/infra/guards/auth/auth.guard';
import type { UpdateUserRequestParamsProps } from '../../../application/use-cases/update/types';
import { UpdateUserRequestBodyDto } from '../../../dtos/update-user.dto';

@AppController('Users', '1', true)
@UseGuards(AuthGuard)
export class UpdateUserController {
  constructor(private readonly useCase: UpdateUserUseCase) {}

  @AppPut({
    path: ':userUuid',
    summary: 'Update a user',
  })
  async handle(
    @Param('userUuid', ParseUUIDPipe) userUuid: UpdateUserRequestParamsProps,
    @Body() body: UpdateUserRequestBodyDto,
  ) {
    return this.useCase.execute({ userUuid, body });
  }
}
