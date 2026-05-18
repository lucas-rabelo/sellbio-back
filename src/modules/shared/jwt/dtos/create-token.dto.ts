import { readUserResponseSchema } from '@/src/modules/app/users/dtos/read-user.dto';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const createTokenJwtRequestSchema = readUserResponseSchema;

const createTokenJwtResponseSchema = z.object({
  token: z.jwt(),
});

class CreateTokenJwtRequestDto extends createZodDto(
  createTokenJwtRequestSchema,
) {}

class CreateTokenJwtResponseDto extends createZodDto(
  createTokenJwtResponseSchema,
) {}

export {
  CreateTokenJwtRequestDto,
  createTokenJwtRequestSchema,
  CreateTokenJwtResponseDto,
  createTokenJwtResponseSchema,
};
