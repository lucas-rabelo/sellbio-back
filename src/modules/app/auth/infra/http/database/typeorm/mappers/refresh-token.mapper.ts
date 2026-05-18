import { RefreshTokenEntity as TypeOrmRefreshToken } from '@/src/infra/database/entities/refresh-token.entity';
import {
  RefreshToken as DomainRefreshToken,
  RefreshTokenProps,
} from '@/src/modules/app/auth/application/entities/refresh-token/refresh-token';

export class RefreshTokenMapper {
  static toTypeOrm(
    domainToken: Partial<RefreshTokenProps>,
  ): TypeOrmRefreshToken {
    const raw = new TypeOrmRefreshToken();

    if (domainToken.uuid) raw.uuid = domainToken.uuid;
    if (domainToken.userUuid) raw.userUuid = domainToken.userUuid;
    if (domainToken.tokenHash) raw.tokenHash = domainToken.tokenHash;

    if (domainToken.expiresAt instanceof Date) {
      raw.expiresAt = domainToken.expiresAt.toISOString();
    } else if (typeof domainToken.expiresAt === 'string') {
      raw.expiresAt = domainToken.expiresAt;
    } else {
      raw.expiresAt = new Date(0).toISOString();
    }

    raw.revoked = domainToken.revoked ?? false;
    raw.replacedBy = domainToken.replacedBy ?? null;

    if (domainToken.replacedAt instanceof Date)
      raw.replacedAt = domainToken.replacedAt.toISOString();
    if (domainToken.lastUsedAt instanceof Date)
      raw.lastUsedAt = domainToken.lastUsedAt.toISOString();

    raw.ip = domainToken.ip ?? undefined;
    raw.userAgent = domainToken.userAgent ?? undefined;

    return raw;
  }

  static toDomain(typeOrmToken: TypeOrmRefreshToken): DomainRefreshToken {
    return DomainRefreshToken.create({
      uuid: typeOrmToken.uuid,
      userUuid: typeOrmToken.userUuid,
      tokenHash: typeOrmToken.tokenHash,
      expiresAt: new Date(typeOrmToken.expiresAt),
      revoked: !!typeOrmToken.revoked,
      replacedBy: typeOrmToken.replacedBy ?? null,
      createdAt: typeOrmToken.createdAt
        ? new Date(typeOrmToken.createdAt)
        : undefined,
      lastUsedAt: typeOrmToken.lastUsedAt
        ? new Date(typeOrmToken.lastUsedAt)
        : null,
      ip: typeOrmToken.ip ?? null,
      userAgent: typeOrmToken.userAgent ?? null,
    });
  }
}
