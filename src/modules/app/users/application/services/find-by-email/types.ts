import z from 'zod';
import type {
  findByEmailUserRequestSchema,
  findByEmailUserResponseSchema,
} from '../../../dtos/find-by-email.dto';

export type FindByEmailUserRequestProps = z.infer<
  typeof findByEmailUserRequestSchema
>;

export type FindByEmailUserResponseProps = z.infer<
  typeof findByEmailUserResponseSchema
>;
