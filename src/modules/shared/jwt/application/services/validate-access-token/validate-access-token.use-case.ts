import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '../generate-access-token/types';
import type { ValidateAccessTokenInput, ValidateAccessTokenOutput } from './types';

@Injectable()
export class ValidateAccessTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(request: ValidateAccessTokenInput): Promise<ValidateAccessTokenOutput> {
    const { token } = request;

    let payload: AccessTokenPayload;
    try {
      payload = await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    return {
      userUuid: payload.sub,
      email: payload.email,
      role: payload.role,
      jti: payload.jti,
    };
  }
}