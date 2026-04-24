import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { createUserRequestSchema } from './create-user.dto';
import { readUserResponseSchema } from './read-user.dto';

const updateUserRequestParamSchema = z.uuid();

const updateUserRequestBodySchema = createUserRequestSchema.partial();

const updateUserResponseSchema = readUserResponseSchema;

const updateUserRequestSchema = z.object({
  userUuid: updateUserRequestParamSchema,
  body: updateUserRequestBodySchema
});

class UpdateUserRequestBodyDto extends createZodDto(updateUserRequestBodySchema) { };

class UpdateUserRequestDto extends createZodDto(updateUserRequestSchema) { };

class UpdateUserResponseDto extends createZodDto(updateUserResponseSchema) { };

export {
  UpdateUserRequestBodyDto,
  UpdateUserRequestDto,
  updateUserRequestSchema,
  UpdateUserResponseDto,
  updateUserResponseSchema
};

