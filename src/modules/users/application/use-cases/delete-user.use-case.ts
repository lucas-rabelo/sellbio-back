import type { DeletedAndUpdatedResponseDto } from "@/infra";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../infra/http/database";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(uuid: string): Promise<DeletedAndUpdatedResponseDto> {
    return this.usersRepository.delete(uuid);
  }
}