import { DeletedAndUpdatedResponseDto } from "@/infra";
import { AppController, AppDelete } from "@/infra/decorators/base";
import { DeleteUserUseCase } from "@/modules/users/application";
import { Param, ParseUUIDPipe } from "@nestjs/common";

@AppController('Users')
export class DeleteUserController {
  constructor(
    private readonly useCase: DeleteUserUseCase,
  ) { }

  @AppDelete({
    summary: "Delete a user",
    param: { name: 'uuid', type: 'string' },
    okResponse: DeletedAndUpdatedResponseDto,
  })
  async handle(
    @Param('uuid', ParseUUIDPipe) uuid: string
  ) {
    return this.useCase.execute(uuid);
  }
}