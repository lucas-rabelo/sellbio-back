import { AppController } from "@/infra/decorators/base";
import { AppGet } from "@/infra/decorators/base/get.decorator";
import { ReadUserUseCase } from "@/modules/users/application";
import { ReadUserResponseDto } from "@/modules/users/dtos";
import { Param, ParseUUIDPipe } from "@nestjs/common";

@AppController('Users')
export class ReadUserController {
  constructor(
    private readonly useCase: ReadUserUseCase,
  ) { }

  @AppGet({
    path: ':uuid',
    summary: "Read a user",
    param: { name: 'uuid', type: 'string' },
    okResponse: ReadUserResponseDto,
  })
  async handle(
    @Param('uuid', ParseUUIDPipe) uuid: string
  ) {
    return this.useCase.execute(uuid);
  }
}