import { Injectable } from '@nestjs/common';
import { randomBytes, randomUUID } from 'crypto';
import { EncryptedBcryptService } from '@/src/modules/shared/bcrypt/application/services/encrypted/encrypted-bcrypt.service';
import { AuthRepository } from '../../../infra/http/database/auth.repository';

export type CreateRefreshTokenMeta = {
  ip?: string;
  userAgent?: string;
};

@Injectable()
export class CreateRefreshTokenService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly encryptedBcryptService: EncryptedBcryptService,
  ) {}

  async execute(
    userUuid: string,
    meta?: CreateRefreshTokenMeta,
  ): Promise<string> {
    const tokenUuid = randomUUID();
    const rawToken = randomBytes(64).toString('hex');
    const tokenHash = await this.encryptedBcryptService.execute(rawToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.authRepository.revokeAllRefreshTokensForUser(userUuid);
    await this.authRepository.createRefreshToken(
      userUuid,
      tokenUuid,
      tokenHash,
      expiresAt,
      meta,
    );

    const refresh_token = `${tokenUuid}.${rawToken}`;
    return refresh_token;
  }
}
