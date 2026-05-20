import { AppController } from '@/src/infra/decorators/base/controller.decorator';
import { AppPost } from '@/src/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';

import { CreateUserUseCase } from '@/src/modules/app/users/application/use-cases/create/create-user.use-case';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from '../../../dtos/create-user.dto';

@AppController('Users', '1')
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
