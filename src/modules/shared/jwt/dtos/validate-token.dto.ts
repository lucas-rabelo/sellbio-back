import { readUserResponseSchema } from '@/src/modules/app/users/dtos/read-user.dto';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const validateTokenJwtResponseSchema = z.object({
  ...readUserResponseSchema,
  password: z.string(),
});

class ValidadeTokenJwtResponseDto extends createZodDto(
  validateTokenJwtResponseSchema,
) {}

export { ValidadeTokenJwtResponseDto, validateTokenJwtResponseSchema };
