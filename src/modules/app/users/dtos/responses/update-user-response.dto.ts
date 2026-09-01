import { createZodDto } from 'nestjs-zod';
import { readUserResponseSchema } from './read-user-response.dto';

const updateUserResponseSchema = readUserResponseSchema;

class UpdateUserResponseDto extends createZodDto(updateUserResponseSchema) { }

export {
  UpdateUserResponseDto,
  updateUserResponseSchema
};

