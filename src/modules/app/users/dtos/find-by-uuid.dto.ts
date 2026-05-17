import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { readUserResponseSchema } from './read-user.dto';

const findByUuidUserRequestSchema = z.string();

const findByUuidUserResponseSchema = z.object({
  ...readUserResponseSchema.shape,
  passwordHash: z.string(),
  refreshToken: z.string().optional(),
});

class FindByUuidUserResponseDto extends createZodDto(
  findByUuidUserResponseSchema,
) {}

export {
  FindByUuidUserResponseDto,
  findByUuidUserRequestSchema,
  findByUuidUserResponseSchema,
};
