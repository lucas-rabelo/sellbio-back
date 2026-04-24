import { BadRequestException } from '@/app/core/exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { ValidateTokenJwtAuthService } from '../validate-token-jwt/validate-token-jwt-auth.service';
import type { CreateAccessTokenJwtAuthRequestProps, CreateAccessTokenJwtAuthResponseProps } from './types';

@Injectable()
export class CreateAccessTokenJwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
  ) { }

  execute(user: CreateAccessTokenJwtAuthRequestProps): CreateAccessTokenJwtAuthResponseProps {
    const accessToken = this.jwtService.sign(
      {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1h',
        subject: user.uuid,
      },
    );

    const tokenIsValid = this.validateTokenJwtAuthService.execute({ token: accessToken, options: {} });

    if (!tokenIsValid) {
      throw new BadRequestException(
        CONTEXT_AUTH.CREATE_TOKEN,
        'Error in creation of the token',
      );
    }

    return {
      accessToken,
    };
  }
}