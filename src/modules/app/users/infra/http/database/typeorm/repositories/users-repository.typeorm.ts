import { UsersEntity } from '@/src/infra/database/entities/users.entity';
import { User as DomainUser } from '@/src/modules/app/users/application/entities/user/users';
import type {
  ListUserRequestProps,
  ListUserResponseProps,
} from '@/src/modules/app/users/application/use-cases/list/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal,
  Like,
  Repository,
  type FindOptionsOrder,
  type FindOptionsWhere,
} from 'typeorm';
import type { UsersRepository } from '../../users.repository';
import { UserMapper } from '../mappers/users.mapper';

@Injectable()
export class UsersRepositoryTypeOrm implements UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async create(user: DomainUser): Promise<void> {
    const raw = UserMapper.toTypeOrm(user);
    await this.repository.save(raw);
  }

  async findByUuid(uuid: string): Promise<DomainUser | null> {
    const user = await this.repository.findOne({
      where: { uuid, deletedAt: undefined },
    });

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const user = await this.repository.findOne({
      where: { email, deletedAt: undefined },
    });

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async list(params: ListUserRequestProps): Promise<ListUserResponseProps> {
    const { page = 1, pageSize = 10, name, email, role, uuid } = params;

    const skip = Number((page - 1) * pageSize);
    const take = Number(pageSize);
    const order: FindOptionsOrder<UsersEntity> = { createdAt: 'DESC' };

    const where:
      | FindOptionsWhere<UsersEntity>
      | FindOptionsWhere<UsersEntity>[] = { deletedAt: undefined };
    if (uuid) {
      where.uuid = Equal(uuid);
    }

    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (email) {
      where.email = Like(`%${email}%`);
    }

    if (role) {
      where.role = Equal(role);
    }

    const [users, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
      order,
    });

    return {
      total,
      data: users.map((user) => UserMapper.toDTO(user)),
    };
  }

  async save(user: DomainUser): Promise<void> {
    const raw = UserMapper.toTypeOrm(user);
    await this.repository.save(raw);
  }
}
