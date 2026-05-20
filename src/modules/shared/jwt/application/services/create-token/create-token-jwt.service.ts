import { InternalServerErrorException } from '@/src/core/exceptions/internal-server-error.exception';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONTEXT_JWT } from '../../constants/contexts';
import { ValidateTokenJwtService } from '../validate-token/validate-token-jwt.service';
import { CreateTokenRequestProps, CreateTokenResponseProps } from './types';

@Injectable()
export class CreateTokenJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateTokenJwtService: ValidateTokenJwtService,
  ) {}

  async execute({
    user,
    options = { expiresIn: '7 days' },
  }: CreateTokenRequestProps): Promise<CreateTokenResponseProps> {
    const token = this.jwtService.sign(
      {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
      },
      {
        ...options,
        subject: user.uuid,
      },
    );

    const tokenIsValid = await this.validateTokenJwtService.execute(token, {});

    if (!tokenIsValid) {
      throw new InternalServerErrorException(
        CONTEXT_JWT.CREATE,
        'Error in creation of the token',
      );
    }

    return {
      token,
    };
  }
}
