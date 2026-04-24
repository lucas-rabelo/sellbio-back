import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ValidateTokenJwtRequestProps, ValidateTokenJwtResponseProps } from './types';

@Injectable()
export class ValidateTokenJwtAuthService {
  constructor(private readonly jwtService: JwtService) { }

  async execute({ token, options }: ValidateTokenJwtRequestProps): Promise<null | ValidateTokenJwtResponseProps> {
    const validated = await this.jwtService.verifyAsync(token, options);

    return validated ?? null;
  }
}