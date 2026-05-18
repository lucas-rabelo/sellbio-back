import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { registerAuthResponseSchema } from './register-auth.dto';
import { readUserResponseSchema } from '../../users/dtos/read-user.dto';

const validateTokenAuthRequestSchema = z.object({
  token: registerAuthResponseSchema.shape.access_token,
});

const validateTokenAuthResponseSchema = z.object({
  ...readUserResponseSchema,
  password: z.string(),
});

class ValidadeTokenAuthRequestDto extends createZodDto(
  validateTokenAuthRequestSchema,
) {}

class ValidadeTokenAuthResponseDto extends createZodDto(
  validateTokenAuthRequestSchema,
) {}

export {
  ValidadeTokenAuthRequestDto,
  ValidadeTokenAuthResponseDto,
  validateTokenAuthRequestSchema,
  validateTokenAuthResponseSchema,
};
