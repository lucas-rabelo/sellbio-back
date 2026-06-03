import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { registerAuthResponseSchema } from './register-auth.dto';

const validateRefreshTokenAuthRequestSchema = z.object({
  refreshToken: z
    .string()
    .min(1, { message: 'Refresh token is required' })
    .describe('Refresh token in format: {tokenUuid}.{rawToken}'),
});

const validateRefreshTokenAuthResponseSchema = registerAuthResponseSchema;

class ValidateRefreshTokenAuthRequestDto extends createZodDto(
  validateRefreshTokenAuthRequestSchema,
) {}

class ValidateRefreshTokenAuthResponseDto extends createZodDto(
  validateRefreshTokenAuthResponseSchema,
) {}

export {
  ValidateRefreshTokenAuthRequestDto,
  ValidateRefreshTokenAuthResponseDto,
  validateRefreshTokenAuthRequestSchema,
  validateRefreshTokenAuthResponseSchema,
};
