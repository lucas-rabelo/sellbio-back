import { AppController } from "@/infra/decorators/base";
import { AppGetList } from "@/infra/decorators/base/getList.decorator";
import { ListUserUseCase } from "@/modules/users/application";
import { ListUserRequestDto, ListUserResponseDto } from "@/modules/users/dtos";
import { Body } from "@nestjs/common";

@AppController('Users')
export class ListUserController {
  constructor(
    private readonly useCase: ListUserUseCase,
  ) { }

  @AppGetList({
    summary: "List users",
    query: ListUserRequestDto,
    okResponse: ListUserResponseDto,
  })
  async handle(
    @Body() body: ListUserRequestDto
  ) {
    return this.useCase.execute(body);
  }
}