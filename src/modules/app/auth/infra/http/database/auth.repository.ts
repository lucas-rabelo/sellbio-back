import type { User } from '@/src/modules/app/users/application/entities/user/users';
import type { RefreshToken } from '@/src/modules/app/auth/application/entities/refresh-token/refresh-token';

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;

  abstract createRefreshToken(
    userUuid: string,
    tokenUuid: string,
    tokenHash: string,
    expiresAt: Date,
    meta?: { ip?: string; userAgent?: string },
  ): Promise<void>;

  abstract findRefreshTokenByUuid(
    tokenUuid: string,
  ): Promise<RefreshToken | null>;

  abstract revokeRefreshToken(
    tokenUuid: string,
    replacedBy?: string | null,
  ): Promise<void>;

  abstract revokeAllRefreshTokensForUser(userUuid: string): Promise<void>;

  abstract rotateRefreshToken(
    oldUuid: string,
    newToken: {
      uuid: string;
      hash: string;
      expiresAt: Date;
      meta?: { ip?: string; userAgent?: string };
    },
  ): Promise<void>;
}
