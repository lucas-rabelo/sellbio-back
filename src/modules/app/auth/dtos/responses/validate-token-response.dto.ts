import { createZodDto } from 'nestjs-zod';
import { readUserResponseSchema } from '../../../users/dtos/read-user.dto';

const validateTokenAuthResponseSchema = readUserResponseSchema;

class ValidadeTokenAuthResponseDto extends createZodDto(
  validateTokenAuthResponseSchema,
) {}

export { ValidadeTokenAuthResponseDto, validateTokenAuthResponseSchema };
