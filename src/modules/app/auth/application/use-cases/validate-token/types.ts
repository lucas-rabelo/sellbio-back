import type z from 'zod';
import type {
  validateTokenAuthRequestSchema,
  validateTokenAuthResponseSchema,
} from '../../../dtos/validate-token-auth.dto';

export type ValidateTokenAuthRequestProps = z.infer<
  typeof validateTokenAuthRequestSchema
>;

export type ValidateTokenAuthResponseProps = z.infer<
  typeof validateTokenAuthResponseSchema
>;
