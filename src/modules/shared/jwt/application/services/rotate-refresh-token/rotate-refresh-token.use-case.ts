import { Injectable } from '@nestjs/common';
import { ValidateRefreshTokenUseCase } from '../validate-refresh-token/validate-refresh-token.use-case';
import { RevokeRefreshTokenUseCase } from '../revoke-refresh-token/revoke-refresh-token.use-case';
import { GenerateAccessTokenUseCase } from '../generate-access-token/generate-access-token.use-case';
import { GenerateRefreshTokenUseCase } from '../generate-refresh-token/generate-refresh-token.use-case';
import { RotateRefreshTokenInput, RotateRefreshTokenOutput } from './types';

@Injectable()
export class RotateRefreshTokenUseCase {
  constructor(
    private readonly validateRefreshToken: ValidateRefreshTokenUseCase,
    private readonly revokeRefreshToken: RevokeRefreshTokenUseCase,
    private readonly generateAccessToken: GenerateAccessTokenUseCase,
    private readonly generateRefreshToken: GenerateRefreshTokenUseCase,
  ) {}

  async execute(input: RotateRefreshTokenInput): Promise<RotateRefreshTokenOutput> {
    const { oldToken, userUuid, email, role } = input;

    const { jti } = await this.validateRefreshToken.execute({ token: oldToken });

    await this.revokeRefreshToken.execute({ userUuid, jti });

    const [{ accessToken }, { refreshToken }] = await Promise.all([
      this.generateAccessToken.execute({ userUuid, email, role }),
      this.generateRefreshToken.execute({ userUuid }),
    ]);

    return { accessToken, refreshToken };
  }
}