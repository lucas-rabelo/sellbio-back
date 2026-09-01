import { RefreshTokenEntity as TypeOrmRefreshToken } from '@/src/infra/database/entities/refresh-token.entity';
import { RefreshToken as DomainRefreshToken } from '@/src/modules/app/auth/application/entities/refresh-token/refresh-token';

export type RefreshTokenMapperInput = {
  uuid?: string;
  userUuid: string;
  tokenHash: string;
  expiresAt: Date | string;
  revoked?: boolean;
  replacedBy?: string | null;
  replacedAt?: Date | string | null;
  lastUsedAt?: Date | string | null;
  ip?: string | null;
  userAgent?: string | null;
};

export class RefreshTokenMapper {
  static toTypeOrm(input: RefreshTokenMapperInput): TypeOrmRefreshToken {
    const typeOrmRefreshToken = new TypeOrmRefreshToken();

    if (input.uuid) typeOrmRefreshToken.uuid = input.uuid;
    if (input.userUuid) typeOrmRefreshToken.userUuid = input.userUuid;
    if (input.tokenHash) typeOrmRefreshToken.tokenHash = input.tokenHash;

    if (input.expiresAt instanceof Date) {
      typeOrmRefreshToken.expiresAt = input.expiresAt.toISOString();
    } else if (typeof input.expiresAt === 'string') {
      typeOrmRefreshToken.expiresAt = input.expiresAt;
    } else {
      throw new Error('expiresAt is required and must be a Date or ISO string');
    }

    typeOrmRefreshToken.revoked = input.revoked ?? false;
    typeOrmRefreshToken.replacedBy = input.replacedBy ?? null;

    if (input.replacedAt instanceof Date) {
      typeOrmRefreshToken.replacedAt = input.replacedAt.toISOString();
    } else if (typeof input.replacedAt === 'string') {
      typeOrmRefreshToken.replacedAt = input.replacedAt;
    } else {
      typeOrmRefreshToken.replacedAt = undefined;
    }

    if (input.lastUsedAt instanceof Date) {
      typeOrmRefreshToken.lastUsedAt = input.lastUsedAt.toISOString();
    } else if (typeof input.lastUsedAt === 'string') {
      typeOrmRefreshToken.lastUsedAt = input.lastUsedAt;
    } else {
      typeOrmRefreshToken.lastUsedAt = undefined;
    }

    typeOrmRefreshToken.ip = input.ip ?? undefined;
    typeOrmRefreshToken.userAgent = input.userAgent ?? undefined;

    return typeOrmRefreshToken;
  }

  static toDomain(typeOrmToken: TypeOrmRefreshToken): DomainRefreshToken {
    return DomainRefreshToken.create({
      userUuid: typeOrmToken.userUuid,
      tokenHash: typeOrmToken.tokenHash,
      expiresAt: new Date(typeOrmToken.expiresAt),
      revoked: !!typeOrmToken.revoked,
      replacedBy: typeOrmToken.replacedBy ?? null,
      createdAt: typeOrmToken.createdAt
        ? new Date(typeOrmToken.createdAt)
        : undefined,
      replacedAt: typeOrmToken.replacedAt
        ? new Date(typeOrmToken.replacedAt)
        : null,
      lastUsedAt: typeOrmToken.lastUsedAt
        ? new Date(typeOrmToken.lastUsedAt)
        : null,
      ip: typeOrmToken.ip ?? null,
      userAgent: typeOrmToken.userAgent ?? null,
    });
  }
}
