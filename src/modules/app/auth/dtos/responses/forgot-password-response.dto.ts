import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const forgotPasswordAuthResponseSchema = z.object({
  url: z.string(),
});

class ForgotPasswordAuthResponseDto extends createZodDto(
  forgotPasswordAuthResponseSchema,
) {}

export { ForgotPasswordAuthResponseDto, forgotPasswordAuthResponseSchema };
