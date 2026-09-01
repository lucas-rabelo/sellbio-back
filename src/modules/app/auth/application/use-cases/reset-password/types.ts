import type z from 'zod';
import type {
  resetPasswordAuthRequestSchema,
  resetPasswordAuthResponseSchema,
} from '../../../dtos';

export type ResetPasswordAuthRequestProps = z.infer<
  typeof resetPasswordAuthRequestSchema
> & {
  meta: {
    ip?: string;
    userAgent?: string;
  };
};

export type ResetPasswordAuthResponseProps = z.infer<
  typeof resetPasswordAuthResponseSchema
>;
