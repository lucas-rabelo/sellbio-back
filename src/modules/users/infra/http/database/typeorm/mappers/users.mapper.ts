import { UsersEntity } from '@/infra/database';
import {
  CreateUserRequestDto,
  type ReadUserResponseDto,
  type UpdateUserRequestDto,
} from '@/modules/users/dtos';

export class UsersMapper {
  static toDatabase(data: CreateUserRequestDto | UpdateUserRequestDto) {
    return {
      name: data.name,
      email: data.email,
      birthDate: data.birthDate,
      phone: data.phone,
      passwordHash: data.password,
      avatarUrl: data.avatarUrl,
      role: data.role,
    };
  }

  static toDomain(raw: UsersEntity): ReadUserResponseDto {
    return {
      uuid: raw.uuid,
      role: raw.role,
      name: raw.name,
      avatarUrl: raw.avatarUrl ?? "",
      birthDate: raw.birthDate,
      email: raw.email,
      phone: raw.phone,
    }
  }
}
