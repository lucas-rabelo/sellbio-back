import { AppController } from "@/app/infra/decorators/base/controller.decorator";
import { AppGet } from "@/app/infra/decorators/base/get.decorator";
import { ReadUserUseCase } from "@/app/modules/users/application/use-cases/read/read-user.use-case";
import { Param, ParseUUIDPipe } from "@nestjs/common";
import type { ReadUserRequestProps } from "../../../application/use-cases/read/types";
import { ReadUserResponseDto } from "../../../dtos/read-user-request.dto";

@AppController('Users')
export class ReadUserController {
  constructor(
    private readonly useCase: ReadUserUseCase,
  ) { }

  @AppGet({
    path: ':userUuid',
    summary: "Read a user",
    okResponse: ReadUserResponseDto,
  })
  async handle(
    @Param('userUuid', ParseUUIDPipe) userUuid: ReadUserRequestProps,
  ) {
    return this.useCase.execute(userUuid);
  }
}