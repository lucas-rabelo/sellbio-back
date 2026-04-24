import { BadRequestException } from '@/app/core/exceptions/bad-request.exception';
import { UpdateUserUseCase } from '@/app/modules/app/users/application/use-cases/update/update-user.use-case';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { ValidateTokenJwtAuthService } from '../validate-token-jwt/validate-token-jwt-auth.service';
import { EncryptedPasswordAuthService } from '../encrypted-password/encrypted-password-auth.service';
import type { CreateRefreshTokenJwtAuthRequestProps, CreateRefreshTokenJwtAuthResponseProps } from './types';
import type Redis from 'ioredis';
import { REDIS_CLIENT } from '@/infra/redis/redis.module';

@Injectable()
export class CreateRefreshTokenJwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
    private readonly encryptedPasswordAuthService: EncryptedPasswordAuthService,
    @Inject(REDIS_CLIENT) private readonly redisClient?: Redis,
  ) { }

  async execute(user: CreateRefreshTokenJwtAuthRequestProps): Promise<CreateRefreshTokenJwtAuthResponseProps> {
    const refreshToken = this.jwtService.sign(
      {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1d',
        subject: user.uuid,
      },
    );

    const tokenIsValid = this.validateTokenJwtAuthService.execute({ token: refreshToken, options: {} });

    if (!tokenIsValid) {
      throw new BadRequestException(
        CONTEXT_AUTH.CREATE_TOKEN,
        'Error in creation of the token',
      );
    }

    const hashedRefreshToken = await this.encryptedPasswordAuthService.execute(refreshToken);

    await this.updateUserUseCase.execute({
      userUuid: user.uuid,
      body: { refreshToken: hashedRefreshToken },
    });

    // store current hashed refresh token in Redis (rotation support)
    try {
      if (this.redisClient) {
        await this.redisClient.set(`refresh:user:${user.uuid}`, hashedRefreshToken, 'EX', 60 * 60 * 24);
      }
    } catch (e) {
      // ignore redis errors to avoid breaking token issuance
    }

    return {
      refreshToken,
    };
  }
}
