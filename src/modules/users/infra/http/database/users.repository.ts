import type { DeletedAndUpdatedResponseDto } from "@/infra";
import type {
  CreateUserRequestDto,
  ListUserRequestDto,
  ListUserResponseDto,
  ReadUserResponseDto,
  UpdateUserRequestDto
} from "../../../dtos";

export abstract class UsersRepository {
  abstract create(data: CreateUserRequestDto): Promise<ReadUserResponseDto>;
  abstract delete(uuid: string): Promise<DeletedAndUpdatedResponseDto>;
  abstract update(uuid: string, data: UpdateUserRequestDto): Promise<DeletedAndUpdatedResponseDto>;
  abstract read(uuid: string): Promise<ReadUserResponseDto | null>;
  abstract list(filters: ListUserRequestDto): Promise<ListUserResponseDto>;
}