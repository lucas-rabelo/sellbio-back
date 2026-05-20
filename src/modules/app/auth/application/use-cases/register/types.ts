import type z from 'zod';
import type {
  registerAuthRequestSchema,
  registerAuthResponseSchema,
} from '../../../dtos/register-auth.dto';

export type RegisterAuthRequestProps = z.infer<
  typeof registerAuthRequestSchema
>;

export type RegisterAuthResponseProps = z.infer<
  typeof registerAuthResponseSchema
>;
