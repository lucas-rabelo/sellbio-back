import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { registerAuthResponseSchema } from '../responses/register-response.dto';

const validateTokenAuthRequestSchema = z.object({
  token: registerAuthResponseSchema.shape.accessToken,
});

class ValidadeTokenAuthRequestDto extends createZodDto(
  validateTokenAuthRequestSchema,
) {}

export { ValidadeTokenAuthRequestDto, validateTokenAuthRequestSchema };
