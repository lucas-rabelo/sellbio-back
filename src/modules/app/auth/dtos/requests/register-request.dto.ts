import { createZodDto } from 'nestjs-zod';
import { createUserRequestSchema } from '../../../users/dtos/create-user.dto';

const registerAuthRequestSchema = createUserRequestSchema;

class RegisterAuthRequestDto extends createZodDto(registerAuthRequestSchema) {}

export { RegisterAuthRequestDto, registerAuthRequestSchema };
