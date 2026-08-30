import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const validateRefreshTokenAuthRequestSchema = z.object({
  refreshToken: z
    .string()
    .min(1, { message: 'Refresh token is required' })
    .describe('Refresh token in format: {tokenUuid}.{rawToken}'),
});

class ValidateRefreshTokenAuthRequestDto extends createZodDto(
  validateRefreshTokenAuthRequestSchema,
) {}

export {
  ValidateRefreshTokenAuthRequestDto,
  validateRefreshTokenAuthRequestSchema,
};
