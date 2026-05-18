import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { createUserRequestSchema } from '../../users/dtos/create-user.dto';

const registerAuthRequestSchema = createUserRequestSchema;

const registerAuthResponseSchema = z.object({
  access_token: z.jwt(),
  refresh_token: z.jwt(),
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
