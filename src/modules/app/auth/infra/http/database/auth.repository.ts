import type { RefreshToken } from '@/src/modules/app/auth/application/entities/refresh-token/refresh-token';
import type { User } from '@/src/modules/app/users/application/entities/user/users';
import type {
  CreateRefreshTokenProps,
  RotateRefreshTokenProps,
} from './auth.repository.types';

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract createRefreshToken(props: CreateRefreshTokenProps): Promise<void>;
  abstract findRefreshTokenByUuid(
    tokenUuid: string,
  ): Promise<RefreshToken | null>;
  abstract revokeRefreshToken(
    tokenUuid: string,
    replacedBy?: string | null,
  ): Promise<void>;
  abstract revokeAllRefreshTokensForUser(userUuid: string): Promise<void>;
  abstract rotateRefreshToken(props: RotateRefreshTokenProps): Promise<void>;
}
