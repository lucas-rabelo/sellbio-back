import { createZodDto } from 'nestjs-zod';
import { registerAuthResponseSchema } from './register-response.dto';

const resetPasswordAuthResponseSchema = registerAuthResponseSchema;

class ResetPasswordAuthResponseDto extends createZodDto(
  resetPasswordAuthResponseSchema,
) {}

export { ResetPasswordAuthResponseDto, resetPasswordAuthResponseSchema };
