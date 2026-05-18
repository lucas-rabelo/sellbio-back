import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import type { CompareBcryptService } from '@/src/modules/shared/bcrypt/application/services/compare';
import type { EncryptedBcryptService } from '@/src/modules/shared/bcrypt/application/services/encrypted';
import type { CreateTokenJwtService } from '@/src/modules/shared/jwt/application/services/create-token';
import { Injectable } from '@nestjs/common';
import { randomUUID, randomBytes } from 'crypto';
import type { AuthRepository } from '../../../infra/http/database/auth.repository';
import { CONTEXT_AUTH } from '../../constants/contexts';
import type { LoginAuthRequestProps, LoginAuthResponseProps } from './types';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly compareBcryptService: CompareBcryptService,
    private readonly encryptedBcryptService: EncryptedBcryptService,
    private readonly createTokenJwtService: CreateTokenJwtService,
  ) {}

  async execute(
    request: LoginAuthRequestProps,
  ): Promise<LoginAuthResponseProps> {
    const { email, password } = request;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(
        CONTEXT_AUTH.LOGIN,
        'Email or password is incorrect',
      );
    }

    const passwordMatch = await this.compareBcryptService.execute(
      password,
      user.passwordHash.value,
    );

    if (!passwordMatch) {
      throw new BadRequestException(
        CONTEXT_AUTH.LOGIN,
        'Email or password is incorrect',
      );
    }

    const tokenUserObject = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate.toString(),
      phone: user.phone,
      role: user.role,
      isActived: user.isActived,
    };

    const { token: access_token } = await this.createTokenJwtService.execute({
      user: tokenUserObject,
      options: {
        expiresIn: '30 minutes',
      },
    });

    // Create opaque refresh token
    const tokenUuid = randomUUID();
    const rawToken = randomBytes(64).toString('hex');
    const tokenHash = await this.encryptedBcryptService.execute(rawToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

    await this.authRepository.createRefreshToken(
      user.uuid,
      tokenUuid,
      tokenHash,
      expiresAt,
    );

    // Return composite token: <uuid>.<raw>
    const refresh_token = `${tokenUuid}.${rawToken}`;

    return {
      access_token,
      refresh_token,
    };
  }
}
