import { createZodDto } from "nestjs-zod";
import z from "zod";

const listRequestSchema = z.object({
  uuid: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
});

class ListRequestDto extends createZodDto(listRequestSchema) { };

export { listRequestSchema, ListRequestDto };
