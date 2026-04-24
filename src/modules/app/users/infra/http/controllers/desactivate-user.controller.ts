import { HTTP_STATUS } from "@/core";
import { AppController } from "@/infra/decorators/base/controller.decorator";
import { AppPatch } from "@/infra/decorators/base/patch.decorator";
import { Param, ParseUUIDPipe } from "@nestjs/common";
import { DeactivateUserUseCase } from "../../../application/use-cases/deactivate/deactivate-user.use-case";
import type { DeactivateUserRequestProps } from "../../../application/use-cases/deactivate/types";

@AppController('Users')
export class DeactivateUserController {
  constructor(
    private readonly useCase: DeactivateUserUseCase,
  ) { }

  @AppPatch({
    path: 'deactivate/:userUuid',
    summary: "Deactivate user of the application",
    httpCode: HTTP_STATUS.NO_CONTENT,
  })
  async handle(
    @Param('userUuid', ParseUUIDPipe) userUuid: DeactivateUserRequestProps
  ) {
    return this.useCase.execute(userUuid);
  }
}