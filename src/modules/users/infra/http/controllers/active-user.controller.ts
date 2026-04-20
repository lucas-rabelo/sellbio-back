import { Param, ParseUUIDPipe } from "@nestjs/common";

import { HTTP_STATUS } from "@/app/core";
import { AppController } from "@/app/infra/decorators/base/controller.decorator";
import { AppPatch } from "@/app/infra/decorators/base/patch.decorator";

import { ActiveUserUseCase } from "@/app/modules/users/application/use-cases/active/active-user.use-case";
import type { ActiveUserRequestProps } from "../../../application/use-cases/active/types";

@AppController('Users')
export class ActiveUserController {
  constructor(
    private readonly useCase: ActiveUserUseCase,
  ) { }

  @AppPatch({
    path: 'active/:userUuid',
    summary: "Active user in application",
    httpCode: HTTP_STATUS.NO_CONTENT,
  })
  async handle(
    @Param('userUuid', ParseUUIDPipe) userUuid: ActiveUserRequestProps
  ) {
    return this.useCase.execute(userUuid);
  }
}