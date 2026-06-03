import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { createUserRequestSchema } from '../../users/dtos/create-user.dto';
import { registerAuthResponseSchema } from './register-auth.dto';

const resetPasswordAuthRequestSchema = z.object({
  token: z.jwt(),
  password: createUserRequestSchema.shape.password,
  confirmPassword: createUserRequestSchema.shape.confirmPassword,
});

const resetPasswordAuthResponseSchema = registerAuthResponseSchema;

class ResetPasswordAuthRequestDto extends createZodDto(
  resetPasswordAuthRequestSchema,
) {}

class ResetPasswordAuthResponseDto extends createZodDto(
  resetPasswordAuthResponseSchema,
) {}

export {
  ResetPasswordAuthRequestDto,
  resetPasswordAuthRequestSchema,
  ResetPasswordAuthResponseDto,
  resetPasswordAuthResponseSchema,
};
