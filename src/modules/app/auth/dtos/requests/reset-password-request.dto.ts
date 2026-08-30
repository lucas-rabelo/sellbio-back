import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { createUserRequestSchema } from '../../../users/dtos/create-user.dto';

const resetPasswordAuthRequestSchema = z.object({
  token: z.jwt(),
  password: createUserRequestSchema.shape.password,
  confirmPassword: createUserRequestSchema.shape.confirmPassword,
});

class ResetPasswordAuthRequestDto extends createZodDto(
  resetPasswordAuthRequestSchema,
) {}

export { ResetPasswordAuthRequestDto, resetPasswordAuthRequestSchema };
