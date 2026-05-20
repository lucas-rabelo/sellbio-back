import { RefreshTokenEntity as TypeOrmRefreshToken } from '@/src/infra/database/entities/refresh-token.entity';
import { RefreshToken as DomainRefreshToken } from '@/src/modules/app/auth/application/entities/refresh-token/refresh-token';

export class RefreshTokenMapper {
  static toTypeOrm(
    domainToken: Partial<DomainRefreshToken>,
  ): TypeOrmRefreshToken {
    const typeOrmRefreshToken = new TypeOrmRefreshToken();

    if (domainToken.uuid) typeOrmRefreshToken.uuid = domainToken.uuid;
    if (domainToken.userUuid)
      typeOrmRefreshToken.userUuid = domainToken.userUuid;
    if (domainToken.tokenHash)
      typeOrmRefreshToken.tokenHash = domainToken.tokenHash;

    if (domainToken.expiresAt instanceof Date) {
      typeOrmRefreshToken.expiresAt = domainToken.expiresAt.toISOString();
    } else if (typeof domainToken.expiresAt === 'string') {
      typeOrmRefreshToken.expiresAt = domainToken.expiresAt;
    } else {
      typeOrmRefreshToken.expiresAt = new Date(0).toISOString();
    }

    typeOrmRefreshToken.revoked = domainToken.revoked ?? false;
    typeOrmRefreshToken.replacedBy = domainToken.replacedBy ?? null;
    typeOrmRefreshToken.replacedAt = domainToken.replacedAt
      ? domainToken.replacedAt.toISOString()
      : undefined;
    typeOrmRefreshToken.lastUsedAt = domainToken.lastUsedAt
      ? domainToken.lastUsedAt.toISOString()
      : undefined;
    typeOrmRefreshToken.ip = domainToken.ip ?? undefined;
    typeOrmRefreshToken.userAgent = domainToken.userAgent ?? undefined;

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
      lastUsedAt: typeOrmToken.lastUsedAt
        ? new Date(typeOrmToken.lastUsedAt)
        : null,
      ip: typeOrmToken.ip ?? null,
      userAgent: typeOrmToken.userAgent ?? null,
    });
  }
}
