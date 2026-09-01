import type z from 'zod';
import type {
  updateUserRequestSchema,
  updateUserResponseSchema,
} from '../../../dtos';

export type UpdateUserRequestProps = z.infer<typeof updateUserRequestSchema>;

export type UpdateUserRequestParamsProps = z.infer<
  typeof updateUserRequestSchema.shape.userUuid
>;

export type UpdateUserRequestBodyProps = z.infer<
  typeof updateUserRequestSchema.shape.body
>;

export type UpdateUserResponseProps = z.infer<typeof updateUserResponseSchema>;
