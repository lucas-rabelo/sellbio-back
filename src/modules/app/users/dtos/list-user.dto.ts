import { listRequestSchema, listResponseSchema } from '@/src/infra';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { readUserResponseSchema } from './read-user.dto';

const listUserRequestSchema = z.object({
  ...listRequestSchema.shape,
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(['ADMIN', 'AGENCY', 'SELLER']).optional(),
});

const listUserResponseSchema = z.object({
  ...listResponseSchema.shape,
  data: z.array(readUserResponseSchema),
});

class ListUserRequestDto extends createZodDto(listUserRequestSchema) {}

class ListUserResponseDto extends createZodDto(listUserResponseSchema) {}

export {
  listUserRequestSchema,
  listUserResponseSchema,
  ListUserRequestDto,
  ListUserResponseDto,
};
