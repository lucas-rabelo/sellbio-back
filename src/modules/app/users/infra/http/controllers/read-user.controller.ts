import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppGet } from '@/src/infra/decorators/base/get.decorator';
import { ReadUserUseCase } from '@/src/modules/app/users/application/use-cases/read/read-user.use-case';
import { Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/src/infra/guards/auth/auth.guard';
import type { ReadUserRequestProps } from '../../../application/use-cases/read/types';
import { ReadUserResponseDto } from '../../../dtos/read-user.dto';

@AppController('Users', '1', true)
@UseGuards(AuthGuard)
export class ReadUserController {
  constructor(private readonly useCase: ReadUserUseCase) {}

  @AppGet({
    path: ':userUuid',
    summary: 'Read a user',
    okResponse: ReadUserResponseDto,
  })
  async handle(
    @Param('userUuid', ParseUUIDPipe) userUuid: ReadUserRequestProps,
  ) {
    return this.useCase.execute(userUuid);
  }
}
