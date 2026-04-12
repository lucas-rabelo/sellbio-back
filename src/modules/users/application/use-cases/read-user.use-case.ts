import { Injectable } from "@nestjs/common";
import type { ReadUserResponseDto } from "../../dtos";
import { UsersRepository } from "../../infra/http/database";

@Injectable()
export class ReadUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(uuid: string): Promise<ReadUserResponseDto | null> {
    return this.usersRepository.read(uuid);
  }
}