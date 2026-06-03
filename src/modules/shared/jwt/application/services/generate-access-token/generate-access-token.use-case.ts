import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { JWT_CONSTANTS } from '../../constants/parameters';
import {
  GenerateAccessTokenInput,
  GenerateAccessTokenOutput,
} from './types';

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: GenerateAccessTokenInput): Promise<GenerateAccessTokenOutput> {
    const { userUuid, email, role } = input;

    const accessToken = await this.jwtService.signAsync(
      { sub: userUuid, email, role, jti: randomUUID() },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: JWT_CONSTANTS.ACCESS_TOKEN_TTL,
      },
    );

    return { accessToken };
  }
}