import { UsersEntity } from "@/infra/database/entities";
import type { CreateUserRequestDto, ListUserRequestDto, ListUserResponseDto, ReadUserResponseDto, UpdateUserRequestDto } from "@/modules/users/dtos";
import { Injectable } from "@nestjs/common";
import { Equal, Like, Repository, type FindOptionsOrder, type FindOptionsWhere } from "typeorm";
import { UsersRepository } from "../../users.repository";
import { UsersMapper } from "../mappers";
import { InjectRepository } from "@nestjs/typeorm";
import type { DeletedAndUpdatedResponseDto } from "@/infra";

@Injectable()
export class UsersRepositoryTypeOrm extends UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {
    super();
  }

  async create(data: CreateUserRequestDto): Promise<ReadUserResponseDto> {
    const dataFormatted = UsersMapper.toDatabase(data);

    const userCreated = this.usersRepository.create(dataFormatted);
    const userSaved = await this.usersRepository.save(userCreated);

    const userWithRelations = await this.usersRepository.findOne({
      where: { uuid: userSaved.uuid },
    });

    if (!userWithRelations) return {} as ReadUserResponseDto;

    return UsersMapper.toDomain(userWithRelations);
  };

  async delete(uuid: string): Promise<DeletedAndUpdatedResponseDto> {
    let where: FindOptionsWhere<UsersEntity> = {
      uuid,
      deletedAt: undefined,
    };

    const userDeleted = this.usersRepository.update(where, {
      deletedAt: new Date().toISOString(),
    });

    if (!userDeleted) {
      return { success: false };
    }

    return { success: true };
  }

  async list(filters: ListUserRequestDto): Promise<ListUserResponseDto> {
    const { page, pageSize } = filters;

    const skip = Number((page - 1) * pageSize);
    const take = Number(pageSize);
    const order: FindOptionsOrder<UsersEntity> = { name: 'ASC' };

    let where: FindOptionsWhere<UsersEntity> | FindOptionsWhere<UsersEntity>[] =
      {
        deletedAt: undefined,
      };

    if (filters.uuid) {
      where.uuid = Equal(filters.uuid);
    }

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    if (filters.email) {
      where.email = Like(`%${filters.email}%`);
    }

    const [result, total] = await this.usersRepository.findAndCount({
      where,
      skip,
      take,
      order,
    });

    return {
      total,
      data: result.map(UsersMapper.toDomain),
    };
  }

  async read(uuid: string): Promise<ReadUserResponseDto | null> {
    let where: FindOptionsWhere<UsersEntity> = {
      deletedAt: undefined,
    };

    const userFounded = await this.usersRepository.findOne({
      where: {
        ...where,
        uuid,
      },
    });

    if (!userFounded) {
      return null;
    }

    return UsersMapper.toDomain(userFounded);
  }

  async update(uuid: string, data: UpdateUserRequestDto): Promise<DeletedAndUpdatedResponseDto> {
    const dataFormatted = UsersMapper.toDatabase(data);
    const userUpdated = this.usersRepository.update(uuid, dataFormatted);

    if (!userUpdated) {
      return { success: false };
    }

    return { success: true };
  }
}