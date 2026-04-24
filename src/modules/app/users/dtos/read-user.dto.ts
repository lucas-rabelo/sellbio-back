import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const readUserRequestSchema = z.uuid();

const readUserResponseSchema = z.object({
  uuid: z.uuid(),
  name: z.string(),
  email: z.string(),
  birthDate: z.string(),
  phone: z.string(),
  avatarUrl: z.string().nullable().optional(),
  isActived: z.boolean(),
  role: z.string(),
});


class ReadUserResponseDto extends createZodDto(readUserResponseSchema) { };

export { ReadUserResponseDto, readUserRequestSchema, readUserResponseSchema };

