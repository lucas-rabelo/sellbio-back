import type z from 'zod';
import type {
  resetPasswordAuthRequestSchema,
  resetPasswordAuthResponseSchema,
} from '../../../dtos/reset-password-auth.dto';

export type ResetPasswordAuthRequestProps = z.infer<
  typeof resetPasswordAuthRequestSchema
>;

export type ResetPasswordAuthResponseProps = z.infer<
  typeof resetPasswordAuthResponseSchema
>;
