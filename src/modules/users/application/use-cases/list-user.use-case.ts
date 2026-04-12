import { Injectable } from "@nestjs/common";
import type { ListUserRequestDto, ListUserResponseDto } from "../../dtos";
import { UsersRepository } from "../../infra/http/database";

@Injectable()
export class ListUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(request: ListUserRequestDto): Promise<ListUserResponseDto> {
    return this.usersRepository.list(request);
  }
}