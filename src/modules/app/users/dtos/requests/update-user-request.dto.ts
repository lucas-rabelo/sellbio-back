import { findByUuidRequestSchema } from '@/src/infra';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { createUserRequestSchema } from './create-user-request.dto';

const updateUserRequestBodySchema = createUserRequestSchema.partial();

const updateUserRequestSchema = z.object({
  userUuid: findByUuidRequestSchema,
  body: updateUserRequestBodySchema,
});

class UpdateUserRequestBodyDto extends createZodDto(
  updateUserRequestBodySchema,
) {}

class UpdateUserRequestDto extends createZodDto(updateUserRequestSchema) {}

export {
  UpdateUserRequestBodyDto,
  UpdateUserRequestDto,
  updateUserRequestSchema
};

