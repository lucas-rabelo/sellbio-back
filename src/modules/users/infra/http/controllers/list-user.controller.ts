import { AppController } from "@/app/infra/decorators/base/controller.decorator";
import { AppGet } from "@/app/infra/decorators/base/get.decorator";
import { ListUserUseCase } from "@/app/modules/users/application/use-cases/list/list-user.use-case";
import { ListUserRequestDto, ListUserResponseDto } from "@/app/modules/users/dtos/list-user-request.dto";
import { Query } from "@nestjs/common";
import type { ListUserRequestProps } from "../../../application/use-cases/list/types";

@AppController('Users')
export class ListUserController {
  constructor(
    private readonly useCase: ListUserUseCase,
  ) { }

  @AppGet({
    summary: "List users",
    query: ListUserRequestDto,
    okResponse: ListUserResponseDto,
  })
  async handle(
    @Query() filters: ListUserRequestProps,
  ) {
    return this.useCase.execute(filters);
  }
}