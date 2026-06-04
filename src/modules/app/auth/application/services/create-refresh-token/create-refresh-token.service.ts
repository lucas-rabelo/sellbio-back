import { Injectable } from '@nestjs/common';
import { randomBytes, randomUUID } from 'crypto';
import { EncryptedBcryptService } from '@/src/modules/shared/bcrypt/application/services/encrypted/encrypted-bcrypt.service';
import { AuthRepository } from '../../../infra/http/database/auth.repository';
import { GenerateRefreshTokenUseCase } from '@/src/modules/shared/jwt/application/services/generate-refresh-token/generate-refresh-token.use-case';
import type { CreateRefreshTokenMetaProps } from './types';

@Injectable()
export class CreateRefreshTokenService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly encryptedBcryptService: EncryptedBcryptService,
    private readonly generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
  ) {}

  async execute(
    userUuid: string,
    meta: CreateRefreshTokenMetaProps,
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

    await this.generateRefreshTokenUseCase.execute({ userUuid: userUuid });

    return `${tokenUuid}.${rawToken}`;
  }
}
