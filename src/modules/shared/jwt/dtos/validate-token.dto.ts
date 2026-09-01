import { readUserResponseSchema } from '@/src/modules/app/users/dtos';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const validateTokenJwtResponseSchema = z.object({
  ...readUserResponseSchema.shape,
  password: z.string(),
});

class ValidadeTokenJwtResponseDto extends createZodDto(
  validateTokenJwtResponseSchema,
) {}

export { ValidadeTokenJwtResponseDto, validateTokenJwtResponseSchema };
