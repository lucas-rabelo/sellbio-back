import { createZodDto } from 'nestjs-zod';
import { registerAuthResponseSchema } from './register-response.dto';

const validateRefreshTokenAuthResponseSchema = registerAuthResponseSchema;

class ValidateRefreshTokenAuthResponseDto extends createZodDto(
  validateRefreshTokenAuthResponseSchema,
) {}

export {
  ValidateRefreshTokenAuthResponseDto,
  validateRefreshTokenAuthResponseSchema,
};
