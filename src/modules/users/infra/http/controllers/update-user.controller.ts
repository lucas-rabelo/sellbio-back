import { AppController } from "@/app/infra/decorators/base/controller.decorator";
import { AppPut } from "@/app/infra/decorators/base/put.decorator";
import { UpdateUserUseCase } from "@/app/modules/users/application/use-cases/update/update-user.use-case";
import { Body, Param, ParseUUIDPipe } from "@nestjs/common";
import type { UpdateUserRequestParamsProps } from "../../../application/use-cases/update/types";
import { UpdateUserRequestBodyDto } from "../../../dtos/update-user-request.dto";

@AppController('Users')
export class UpdateUserController {
  constructor(
    private readonly useCase: UpdateUserUseCase,
  ) { }

  @AppPut({
    path: ':userUuid',
    summary: "Update a user",
  })
  async handle(
    @Param('userUuid', ParseUUIDPipe) userUuid: UpdateUserRequestParamsProps,
    @Body() body: UpdateUserRequestBodyDto,
  ) {
    return this.useCase.execute({ userUuid, body });
  }
}