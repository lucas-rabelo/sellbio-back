import { createZodDto } from 'nestjs-zod';
import { registerAuthResponseSchema } from './register-response.dto';

const loginAuthResponseSchema = registerAuthResponseSchema;

class LoginAuthResponseDto extends createZodDto(loginAuthResponseSchema) {}

export { LoginAuthResponseDto, loginAuthResponseSchema };
