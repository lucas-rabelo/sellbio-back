import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const listResponseSchema = z.object({
  total: z.number(),
});

class ListResponseDto extends createZodDto(listResponseSchema) {}

export { listResponseSchema, ListResponseDto };
