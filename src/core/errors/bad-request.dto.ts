import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const badRequestSchema = z.object({
  status: z.string(),
  message: z.string(),
});

type BadRequestResponseTypeDto = z.infer<typeof badRequestSchema>;
class BadRequestResponseDto extends createZodDto(badRequestSchema) {}

export {
  badRequestSchema,
  type BadRequestResponseTypeDto,
  BadRequestResponseDto,
};
