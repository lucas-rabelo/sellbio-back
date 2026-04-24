import { BadRequestException } from '@/app/core/exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { ValidateTokenJwtAuthService } from '../../services/validate-token-jwt/validate-token-jwt-auth.service';
import { FindByUuidUserService } from '@/app/modules/app/users/application/services/find-by-uuid/find-by-uuid-user.service';
import { ComparePasswordAuthService } from '../../services/compare-password/compare-password-auth.service';
import { CreateAccessTokenJwtAuthService } from '../../services/create-access-token/create-access-token-jwt-auth.service';
import { CreateRefreshTokenJwtAuthService } from '../../services/create-refresh-token/create-refresh-token-jwt-auth.service';
import type { RefreshAuthRequestProps, RefreshAuthResponseProps } from './types';

@Injectable()
export class RefreshTokenAuthUseCase {
  constructor(
    private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
    private readonly findByUuidUserService: FindByUuidUserService,
    private readonly comparePasswordAuthService: ComparePasswordAuthService,
    private readonly createAccessTokenJwtAuthService: CreateAccessTokenJwtAuthService,
    private readonly createRefreshTokenJwtAuthService: CreateRefreshTokenJwtAuthService,
  ) { }

  async execute({ refreshToken }: RefreshAuthRequestProps): Promise<RefreshAuthResponseProps> {
    let data: any;

    try {
      data = await this.validateTokenJwtAuthService.execute({ token: refreshToken, options: {} });
    } catch (err) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid token');
    }

    if (!data) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid token');
    }

    const uuid = data.uuid ?? data.sub;

    const user = await this.findByUuidUserService.execute(uuid as string);

    if (!user || !user.refreshToken) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid refresh token');
    }

    const isTokenValid = await this.comparePasswordAuthService.execute(refreshToken, user.refreshToken as string);

    if (!isTokenValid) {
      throw new BadRequestException(CONTEXT_AUTH.REFRESH_TOKEN, 'Invalid refresh token');
    }

    const { accessToken } = this.createAccessTokenJwtAuthService.execute(user as any);
    const { refreshToken: newRefreshToken } = await this.createRefreshTokenJwtAuthService.execute(user as any);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
