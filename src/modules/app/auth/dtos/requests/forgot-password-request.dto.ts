import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { createUserRequestSchema } from '../../../users/dtos';

const forgotPasswordAuthRequestSchema = z.object({
  email: createUserRequestSchema.shape.email,
});

class ForgotPasswordAuthRequestDto extends createZodDto(
  forgotPasswordAuthRequestSchema,
) {}

export { ForgotPasswordAuthRequestDto, forgotPasswordAuthRequestSchema };
