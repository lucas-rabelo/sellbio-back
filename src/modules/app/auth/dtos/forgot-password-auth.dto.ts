import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { createUserRequestSchema } from '../../users/dtos/create-user.dto';

const forgotPasswordAuthRequestSchema = z.object({
  email: createUserRequestSchema.shape.email,
});

const forgotPasswordAuthResponseSchema = z.object({
  url: z.string(),
});

class ForgotPasswordAuthRequestDto extends createZodDto(
  forgotPasswordAuthRequestSchema,
) {}

class ForgotPasswordAuthResponseDto extends createZodDto(
  forgotPasswordAuthResponseSchema,
) {}

export {
  ForgotPasswordAuthRequestDto,
  forgotPasswordAuthRequestSchema,
  ForgotPasswordAuthResponseDto,
  forgotPasswordAuthResponseSchema,
};
