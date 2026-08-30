import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { createUserRequestSchema } from '../../../users/dtos/create-user.dto';

const forgotPasswordAuthRequestSchema = z.object({
  email: createUserRequestSchema.shape.email,
});

class ForgotPasswordAuthRequestDto extends createZodDto(
  forgotPasswordAuthRequestSchema,
) {}

export { ForgotPasswordAuthRequestDto, forgotPasswordAuthRequestSchema };
