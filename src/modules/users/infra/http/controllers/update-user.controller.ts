import { DeletedAndUpdatedResponseDto } from "@/infra";
import { AppController, AppPut } from "@/infra/decorators/base";
import { UpdateUserUseCase } from "@/modules/users/application";
import { UpdateUserRequestDto } from "@/modules/users/dtos";
import { Body, Param, ParseUUIDPipe } from "@nestjs/common";

@AppController('Users')
export class UpdateUserController {
  constructor(
    private readonly useCase: UpdateUserUseCase,
  ) { }

  @AppPut({
    summary: "Update a user",
    param: { name: 'uuid', type: 'string' },
    body: UpdateUserRequestDto,
    okResponse: DeletedAndUpdatedResponseDto,
  })
  async handle(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() body: UpdateUserRequestDto,
  ) {
    return this.useCase.execute(uuid, body);
  }
}