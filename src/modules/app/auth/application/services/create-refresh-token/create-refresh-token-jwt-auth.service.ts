import { BadRequestException } from '@/app/core/exceptions/bad-request.exception';
import { UpdateUserUseCase } from '@/app/modules/app/users/application/use-cases/update/update-user.use-case';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { ValidateTokenJwtAuthService } from '../validate-token-jwt/validate-token-jwt-auth.service';
import { EncryptedPasswordAuthService } from '../encrypted-password/encrypted-password-auth.service';
import type { CreateRefreshTokenJwtAuthRequestProps, CreateRefreshTokenJwtAuthResponseProps } from './types';

@Injectable()
export class CreateRefreshTokenJwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
    private readonly encryptedPasswordAuthService: EncryptedPasswordAuthService,
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

    return {
      refreshToken,
    };
  }
}