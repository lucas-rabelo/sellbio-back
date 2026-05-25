import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { registerAuthResponseSchema } from './register-auth.dto';
import { createUserRequestSchema } from '../../users/dtos/create-user.dto';

const loginAuthRequestSchema = z.object({
  email: createUserRequestSchema.shape.email,
  password: createUserRequestSchema.shape.password,
});

const loginAuthResponseSchema = registerAuthResponseSchema;

class LoginAuthRequestDto extends createZodDto(loginAuthRequestSchema) {}

class LoginAuthResponseDto extends createZodDto(loginAuthResponseSchema) {}

export {
  LoginAuthRequestDto,
  loginAuthRequestSchema,
  LoginAuthResponseDto,
  loginAuthResponseSchema,
};
