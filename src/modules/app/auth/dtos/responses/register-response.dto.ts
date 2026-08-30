import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const registerAuthResponseSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.string(),
});

class RegisterAuthResponseDto extends createZodDto(
  registerAuthResponseSchema,
) {}

export { RegisterAuthResponseDto, registerAuthResponseSchema };
