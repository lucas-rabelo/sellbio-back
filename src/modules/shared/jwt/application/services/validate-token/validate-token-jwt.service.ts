import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import type { ValidateTokenResponseProps } from './types';

@Injectable()
export class ValidateTokenJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(
    token: string,
    options: JwtVerifyOptions,
  ): Promise<null | ValidateTokenResponseProps> {
    try {
      const validatedUnknown = (await this.jwtService.verifyAsync(
        token,
        options,
      )) as unknown;

      if (validatedUnknown && typeof validatedUnknown === 'object') {
        return validatedUnknown as ValidateTokenResponseProps;
      }

      return null;
    } catch {
      return null;
    }
  }
}
