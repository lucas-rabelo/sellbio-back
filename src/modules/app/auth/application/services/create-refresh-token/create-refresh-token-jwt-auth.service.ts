import { BadRequestException } from '@/app/core/exceptions/bad-request.exception';
import { UpdateUserUseCase } from '@/app/modules/app/users/application/use-cases/update/update-user.use-case';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { ValidateTokenJwtAuthService } from '../validate-token-jwt/validate-token-jwt-auth.service';
import { EncryptedPasswordAuthService } from '../encrypted-password/encrypted-password-auth.service';
import type { CreateRefreshTokenJwtAuthRequestProps, CreateRefreshTokenJwtAuthResponseProps } from './types';
import type Redis from 'ioredis';
import { REDIS_CLIENT } from '@/app/infra/redis/redis.module';

const SEVEN_DAYS = 60 * 60 * 24 * 7; // seconds
const GRACE_SECONDS = 30; // reduced grace window

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
        expiresIn: '7d',
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

    let oldHashed: string | null = null;
    try {
      if (this.redisClient) {
        oldHashed = await this.redisClient.get(`refresh:user:${user.uuid}`);
      }
    } catch (e) {
    }

    await this.updateUserUseCase.execute({
      userUuid: user.uuid,
      body: { refreshToken: hashedRefreshToken },
    });

    try {
      if (this.redisClient) {
        if (oldHashed) {
          await this.redisClient.set(`refresh:user:${user.uuid}:prev`, oldHashed, 'EX', GRACE_SECONDS);
        }
        await this.redisClient.set(`refresh:user:${user.uuid}`, hashedRefreshToken, 'EX', SEVEN_DAYS);
      }
    } catch (e) {
    }

    return {
      refreshToken,
    };
  }
}
