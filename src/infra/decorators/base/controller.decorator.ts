import { BadRequestResponseDto } from '@/src/core/errors';
import { applyDecorators, Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function AppController(prefix: string) {
  return applyDecorators(
    ApiTags(prefix),
    Controller(prefix.toLowerCase()),
    ApiBadRequestResponse({ type: BadRequestResponseDto }),
    ApiUnauthorizedResponse({ type: BadRequestResponseDto }),
    ApiInternalServerErrorResponse({ type: BadRequestResponseDto }),
  );
}
