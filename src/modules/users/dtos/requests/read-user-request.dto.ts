import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const readUserSchema = z.object({
  uuid: z.uuid({ error: 'Uuid is invalid' }),
});

class ReadUserRequestDto extends createZodDto(readUserSchema) { };

export { ReadUserRequestDto, readUserSchema };

