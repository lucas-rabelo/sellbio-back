import type z from 'zod';
import type {
  validateTokenAuthRequestSchema,
  validateTokenAuthResponseSchema,
} from '../../../dtos';

export type ValidateTokenAuthRequestProps = z.infer<
  typeof validateTokenAuthRequestSchema
>;

export type ValidateTokenAuthResponseProps = z.infer<
  typeof validateTokenAuthResponseSchema
>;
