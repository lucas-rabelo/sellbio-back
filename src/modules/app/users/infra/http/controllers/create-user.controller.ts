import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/src/infra/guards/auth/auth.guard';

import { CreateUserUseCase } from '@/src/modules/app/users/application/use-cases/create/create-user.use-case';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from '../../../dtos';

@AppController('Users', '1', true)
@UseGuards(AuthGuard)
export class CreateUserController {
  constructor(private readonly useCase: CreateUserUseCase) {}

  @AppPost({
    summary: 'Creating a new user',
    body: CreateUserRequestDto,
    okResponse: CreateUserResponseDto,
  })
  async handle(@Body() body: CreateUserRequestDto) {
    return this.useCase.execute(body);
  }
}
