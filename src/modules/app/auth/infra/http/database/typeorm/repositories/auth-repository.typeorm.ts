import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { RefreshTokenEntity, UsersEntity } from '@/src/infra';
import type { User } from '@/src/modules/app/users/application/entities/user/users';

import { RefreshToken as DomainRefreshToken } from '@/src/modules/app/auth/application/entities/refresh-token/refresh-token';
import type { AuthRepository } from '../../auth.repository';
import type {
  CreateRefreshTokenProps,
  RotateRefreshTokenProps,
} from '../../auth.repository.types';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';

import { AuthMapper } from '../mappers/auth.mapper';

@Injectable()
export class AuthRepositoryTypeorm implements AuthRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,

    @InjectRepository(RefreshTokenEntity)
    private readonly refreshRepository: Repository<RefreshTokenEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email, deletedAt: undefined },
    });

    if (!user) return null;

    return AuthMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const raw = AuthMapper.toTypeOrm(user);
    await this.repository.save(raw);
  }

  async createRefreshToken({
    userUuid,
    tokenUuid,
    tokenHash,
    expiresAt,
    meta,
  }: CreateRefreshTokenProps): Promise<void> {
    const raw = RefreshTokenMapper.toTypeOrm({
      uuid: tokenUuid,
      userUuid,
      tokenHash,
      expiresAt,
      ip: meta?.ip,
      userAgent: meta?.userAgent,
    });

    await this.refreshRepository.save(raw);
  }

  async findRefreshTokenByUuid(
    tokenUuid: string,
  ): Promise<DomainRefreshToken | null> {
    const token = await this.refreshRepository.findOne({
      where: { uuid: tokenUuid },
    });
    if (!token) return null;

    return RefreshTokenMapper.toDomain(token);
  }

  async revokeRefreshToken(
    tokenUuid: string,
    replacedBy?: string | null,
  ): Promise<void> {
    await this.refreshRepository.update(
      { uuid: tokenUuid },
      { revoked: true, replacedBy, replacedAt: new Date().toISOString() },
    );
  }

  async revokeAllRefreshTokensForUser(userUuid: string): Promise<void> {
    await this.refreshRepository.update({ userUuid }, { revoked: true });
  }

  async rotateRefreshToken({
    oldUuid,
    newToken,
  }: RotateRefreshTokenProps): Promise<void> {
    const old = await this.refreshRepository.findOne({
      where: { uuid: oldUuid },
    });
    if (!old) throw new Error('Old refresh token not found');

    const { uuid, hash: tokenHash, expiresAt, meta } = newToken;

    const rawNew = RefreshTokenMapper.toTypeOrm({
      uuid,
      userUuid: oldUuid,
      tokenHash,
      expiresAt,
      ip: meta?.ip,
      userAgent: meta?.userAgent,
    });

    await this.refreshRepository.save(rawNew);
    await this.refreshRepository.update(
      { uuid: oldUuid },
      {
        revoked: true,
        replacedBy: newToken.uuid,
        replacedAt: new Date().toISOString(),
        lastUsedAt: new Date().toISOString(),
      },
    );
  }
}
