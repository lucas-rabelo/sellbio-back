import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/app/infra";

import { UsersRepositoryTypeOrm } from "./infra/http/database/typeorm/repositories/users-repository.typeorm";
import { UsersRepository } from "./infra/http/database/users.repository";

import { ActiveUserUseCase } from "./application/use-cases/active/active-user.use-case";
import { CreateUserUseCase } from "./application/use-cases/create/create-user.use-case";
import { DeleteUserUseCase } from "./application/use-cases/delete/delete-user.use-case";
import { DeactivateUserUseCase } from "./application/use-cases/deactivate/deactivate-user.use-case";
import { ListUserUseCase } from "./application/use-cases/list/list-user.use-case";
import { ReadUserUseCase } from "./application/use-cases/read/read-user.use-case";
import { UpdateUserUseCase } from "./application/use-cases/update/update-user.use-case";

import { ActiveAndDisableUserController } from "./infra/http/controllers/desactive-user.controller";
import { CreateUserController } from "./infra/http/controllers/create-user.controller";
import { DeleteUserController } from "./infra/http/controllers/delete-user.controller";
import { ListUserController } from "./infra/http/controllers/list-user.controller";
import { ReadUserController } from "./infra/http/controllers/read-user.controller";
import { UpdateUserController } from "./infra/http/controllers/update-user.controller";

@Module({
  imports: [DatabaseModule],
  providers: [
    ActiveUserUseCase,
    DeactivateUserUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    ReadUserUseCase,
    ListUserUseCase,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryTypeOrm,
    }
  ],
  controllers: [
    ActiveAndDisableUserController,
    CreateUserController,
    DeleteUserController,
    UpdateUserController,
    ReadUserController,
    ListUserController,
  ],
})
export class UsersModule { };
