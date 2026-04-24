import { HTTP_STATUS } from "@/core";
import { DeletedAndUpdatedResponseDto } from "@/infra";
import { AppController } from "@/infra/decorators/base/controller.decorator";
import { AppDelete } from "@/infra/decorators/base/delete.decorator";
import { DeleteUserUseCase } from "@/modules/app/users/application/use-cases/delete/delete-user.use-case";
import { Param, ParseUUIDPipe } from "@nestjs/common";
import type { DeleteUserRequestProps } from "../../../application/use-cases/delete/types";

@AppController('Users')
export class DeleteUserController {
  constructor(
    private readonly useCase: DeleteUserUseCase,
  ) { }

  @AppDelete({
    path: ':userUuid',
    summary: "Delete a user",
    okResponse: DeletedAndUpdatedResponseDto,
    httpCode: HTTP_STATUS.NO_CONTENT,
  })
  async handle(
    @Param('userUuid', ParseUUIDPipe) userUuid: DeleteUserRequestProps
  ) {
    return this.useCase.execute(userUuid);
  }
}