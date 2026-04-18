import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const deleteUserSchema = z.object({
  uuid: z.uuid({ error: 'Uuid is invalid' }),
});

class DeleteUserRequestDto extends createZodDto(deleteUserSchema) { };

export { DeleteUserRequestDto, deleteUserSchema };

