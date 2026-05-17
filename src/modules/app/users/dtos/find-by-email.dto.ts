import z from 'zod';
import { readUserResponseSchema } from './read-user.dto';
import { createZodDto } from 'nestjs-zod';

const findByEmailUserRequestSchema = z.email();

const findByEmailUserResponseSchema = z.object({
  ...readUserResponseSchema.shape,
  passwordHash: z.string(),
});

class FindByEmailUserResponseDto extends createZodDto(
  findByEmailUserResponseSchema,
) {}

export {
  FindByEmailUserResponseDto,
  findByEmailUserRequestSchema,
  findByEmailUserResponseSchema,
};
