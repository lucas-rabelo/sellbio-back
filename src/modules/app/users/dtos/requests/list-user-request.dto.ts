import { ROLE_ENUM } from '@/src/core/constants/enum';
import { listRequestSchema } from '@/src/infra';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const listUserRequestSchema = z.object({
  ...listRequestSchema.shape,
  name: z.string().optional(),
  email: z.string().optional(),
  role: z
    .enum([ROLE_ENUM.ADMIN, ROLE_ENUM.AGENCY, ROLE_ENUM.SELLER])
    .optional(),
});

class ListUserRequestDto extends createZodDto(listUserRequestSchema) {}

export { ListUserRequestDto, listUserRequestSchema };
