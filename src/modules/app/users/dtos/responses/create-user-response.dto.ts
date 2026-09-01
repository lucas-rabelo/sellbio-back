import { createZodDto } from 'nestjs-zod';
import { readUserResponseSchema } from './read-user-response.dto';

const createUserResponseSchema = readUserResponseSchema;

class CreateUserResponseDto extends createZodDto(createUserResponseSchema) {}

export { CreateUserResponseDto, createUserResponseSchema };
