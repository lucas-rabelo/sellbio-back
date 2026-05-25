import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { CompareBcryptService } from '@/src/modules/shared/bcrypt/application/services/compare/compare-bcrypt.service';
import { CreateTokenJwtService } from '@/src/modules/shared/jwt/application/services/create-token/create-token-jwt.service';
import { AuthRepository } from '../../../infra/http/database/auth.repository';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { CreateRefreshTokenService } from '../../services/create-refresh-token/create-refresh-token.service';
import { FindByUuidUserService } from '@/src/modules/app/users/application/services/find-by-uuid/find-by-uuid-user.service';
import type {
  ValidateRefreshTokenAuthMetaProps,
  ValidateRefreshTokenAuthRequestProps,
  ValidateRefreshTokenAuthResponseProps,
} from './types';

@Injectable()
export class ValidateRefreshTokenAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly compareBcryptService: CompareBcryptService,
    private readonly createTokenJwtService: CreateTokenJwtService,
    private readonly createRefreshTokenService: CreateRefreshTokenService,
    private readonly findByUuidUserService: FindByUuidUserService,
  ) {}

  async execute(
    request: ValidateRefreshTokenAuthRequestProps,
    meta: ValidateRefreshTokenAuthMetaProps,
  ): Promise<ValidateRefreshTokenAuthResponseProps> {
    const { refresh_token } = request;

    const [tokenUuid, rawToken] = refresh_token.split('.');

    if (!tokenUuid || !rawToken) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Invalid refresh token format. Expected: {tokenUuid}.{rawToken}',
      );
    }

    const storedRefreshToken =
      await this.authRepository.findRefreshTokenByUuid(tokenUuid);

    if (!storedRefreshToken) {
      throw new NotFoundException(CONTEXT_AUTH.VALIDATE_TOKEN);
    }

    if (storedRefreshToken.revoked) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Refresh token has been revoked',
      );
    }

    const isExpired = new Date() > new Date(storedRefreshToken.expiresAt);
    if (isExpired) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Refresh token has expired',
      );
    }

    const tokenMatches = await this.compareBcryptService.execute(
      rawToken,
      storedRefreshToken.tokenHash,
    );

    if (!tokenMatches) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Invalid refresh token',
      );
    }

    const user = await this.findByUuidUserService.execute(
      storedRefreshToken.userUuid,
    );

    if (!user) {
      throw new NotFoundException(CONTEXT_AUTH.VALIDATE_TOKEN);
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

    // Generate new refresh token (token rotation)
    const refresh_token_new = await this.createRefreshTokenService.execute(
      user.uuid,
      meta,
    );

    return {
      access_token,
      refresh_token: refresh_token_new,
    };
  }
}
