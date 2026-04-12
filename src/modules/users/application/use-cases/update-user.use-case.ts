import type { DeletedAndUpdatedResponseDto } from "@/infra";
import { Injectable } from "@nestjs/common";
import type { UpdateUserRequestDto } from "../../dtos";
import { UsersRepository } from "../../infra/http/database";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(uuid: string, request: UpdateUserRequestDto): Promise<DeletedAndUpdatedResponseDto> {
    return this.usersRepository.update(uuid, request);
  }
}