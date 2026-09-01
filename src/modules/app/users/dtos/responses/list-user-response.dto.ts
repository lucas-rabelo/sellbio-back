import { listResponseSchema } from '@/src/infra';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { readUserResponseSchema } from './read-user-response.dto';

const listUserResponseSchema = z.object({
  ...listResponseSchema.shape,
  data: z.array(readUserResponseSchema),
});

class ListUserResponseDto extends createZodDto(listUserResponseSchema) {}

export { ListUserResponseDto, listUserResponseSchema };
