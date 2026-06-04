import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { createUserRequestSchema } from '../../users/dtos/create-user.dto';

const registerAuthRequestSchema = createUserRequestSchema;

const registerAuthResponseSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.string(),
});

class RegisterAuthRequestDto extends createZodDto(registerAuthRequestSchema) {}

class RegisterAuthResponseDto extends createZodDto(
  registerAuthResponseSchema,
) {}

export {
  RegisterAuthRequestDto,
  registerAuthRequestSchema,
  RegisterAuthResponseDto,
  registerAuthResponseSchema,
};
