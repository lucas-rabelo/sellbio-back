import { createZodDto } from 'nestjs-zod';
import { readUserResponseSchema } from '../../../users/dtos';

const validateTokenAuthResponseSchema = readUserResponseSchema;

class ValidadeTokenAuthResponseDto extends createZodDto(
  validateTokenAuthResponseSchema,
) {}

export { ValidadeTokenAuthResponseDto, validateTokenAuthResponseSchema };
