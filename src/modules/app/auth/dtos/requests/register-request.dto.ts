import { createZodDto } from 'nestjs-zod';
import { createUserRequestSchema } from '../../../users/dtos';

const registerAuthRequestSchema = createUserRequestSchema;

class RegisterAuthRequestDto extends createZodDto(registerAuthRequestSchema) {}

export { RegisterAuthRequestDto, registerAuthRequestSchema };
