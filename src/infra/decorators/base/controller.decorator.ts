import { BadRequestResponseDto } from '@/src/core/errors';
import { applyDecorators, Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

export function AppController(
  prefix: string,
  version: string,
  hasAuthentication = false,
) {
  const ApiAuth = hasAuthentication ? ApiBearerAuth() : () => {};

  return applyDecorators(
    ApiTags(prefix),
    Controller({ path: prefix.toLowerCase(), version }),
    ApiBadRequestResponse({ type: BadRequestResponseDto }),
    ApiUnauthorizedResponse({ type: BadRequestResponseDto }),
    ApiInternalServerErrorResponse({ type: BadRequestResponseDto }),
    ApiAuth,
  );
}
