import { AppController, AppPost } from "@/infra/decorators/base";
import { CreateUserUseCase } from "@/modules/users/application";
import { CreateUserRequestDto, ReadUserResponseDto } from "@/modules/users/dtos";
import { Body } from "@nestjs/common";

@AppController('Users')
export class CreateUserController {
  constructor(
    private readonly useCase: CreateUserUseCase,
  ) { }

  @AppPost({
    summary: "Creating a new user",
    body: CreateUserRequestDto,
    okResponse: ReadUserResponseDto,
  })
  async handle(
    @Body() body: CreateUserRequestDto
  ) {
    return this.useCase.execute(body);
  }
}