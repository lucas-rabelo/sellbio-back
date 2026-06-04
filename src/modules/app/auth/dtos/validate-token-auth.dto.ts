import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { registerAuthResponseSchema } from './register-auth.dto';
import { readUserResponseSchema } from '../../users/dtos/read-user.dto';

const validateTokenAuthRequestSchema = z.object({
  token: registerAuthResponseSchema.shape.accessToken,
});

const validateTokenAuthResponseSchema = readUserResponseSchema;

class ValidadeTokenAuthRequestDto extends createZodDto(
  validateTokenAuthRequestSchema,
) {}

class ValidadeTokenAuthResponseDto extends createZodDto(
  validateTokenAuthResponseSchema,
) {}

export {
  ValidadeTokenAuthRequestDto,
  ValidadeTokenAuthResponseDto,
  validateTokenAuthRequestSchema,
  validateTokenAuthResponseSchema,
};
