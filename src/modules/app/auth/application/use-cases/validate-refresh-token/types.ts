import type z from 'zod';
import type {
  validateRefreshTokenAuthRequestSchema,
  validateRefreshTokenAuthResponseSchema,
} from '../../../dtos';

export type ValidateRefreshTokenAuthRequestProps = z.infer<
  typeof validateRefreshTokenAuthRequestSchema
> & {
  meta: {
    ip?: string;
    userAgent?: string;
  };
};

export type ValidateRefreshTokenAuthResponseProps = z.infer<
  typeof validateRefreshTokenAuthResponseSchema
>;
