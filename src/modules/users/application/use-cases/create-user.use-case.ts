import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../infra/http/database";
import type { CreateUserRequestDto, ReadUserResponseDto } from "../../dtos";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(request: CreateUserRequestDto): Promise<ReadUserResponseDto> {
    return this.usersRepository.create(request);
  }
}