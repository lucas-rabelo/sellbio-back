import z from 'zod';
import { readUserResponseSchema } from './read-user-response.dto';
import { createZodDto } from 'nestjs-zod';

const findByEmailUserResponseSchema = z.object({
  ...readUserResponseSchema.shape,
  passwordHash: z.string(),
});

class FindByEmailUserResponseDto extends createZodDto(
  findByEmailUserResponseSchema,
) {}

export { FindByEmailUserResponseDto, findByEmailUserResponseSchema };
