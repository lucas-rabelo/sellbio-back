import { AppController } from "@/app/infra/decorators/base/controller.decorator";
import { AppPost } from "@/app/infra/decorators/base/post.decorator";
import { Body } from "@nestjs/common";

import { CreateUserUseCase } from "@/app/modules/app/users/application/use-cases/create/create-user.use-case";
import type { CreateUserRequestProps } from "../../../application/use-cases/create/types";
import { CreateUserRequestDto, CreateUserResponseDto } from "../../../dtos/create-user.dto";

@AppController('Users')
export class CreateUserController {
  constructor(
    private readonly useCase: CreateUserUseCase,
  ) { }

  @AppPost({
    summary: "Creating a new user",
    body: CreateUserRequestDto,
    okResponse: CreateUserResponseDto,
  })
  async handle(
    @Body() body: CreateUserRequestDto,
  ) {
    return this.useCase.execute(body);
  }
}