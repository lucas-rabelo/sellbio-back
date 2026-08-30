import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { createUserRequestSchema } from '../../../users/dtos/create-user.dto';

const loginAuthRequestSchema = z.object({
  email: createUserRequestSchema.shape.email,
  password: createUserRequestSchema.shape.password,
});

class LoginAuthRequestDto extends createZodDto(loginAuthRequestSchema) {}

export { LoginAuthRequestDto, loginAuthRequestSchema };
