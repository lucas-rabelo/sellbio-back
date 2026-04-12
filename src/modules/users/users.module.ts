import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/infra";

import { 
  CreateUserUseCase, 
  DeleteUserUseCase, 
  ListUserUseCase, 
  ReadUserUseCase, 
  UpdateUserUseCase 
} from './application/use-cases';

import { 
  CreateUserController, 
  DeleteUserController, 
  ListUserController, 
  ReadUserController, 
  UpdateUserController 
} from "./infra/http/controllers";

import { UsersRepository, UsersRepositoryTypeOrm } from "./infra/http/database";

@Module({
  imports: [DatabaseModule],
  providers: [
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
    CreateUserController,
    DeleteUserController,
    UpdateUserController,
    ReadUserController,
    ListUserController,
  ],
})
export class UsersModule { };
