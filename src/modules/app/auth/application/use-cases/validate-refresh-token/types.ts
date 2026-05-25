import type z from 'zod';
import type {
  validateRefreshTokenAuthRequestSchema,
  validateRefreshTokenAuthResponseSchema,
} from '../../../dtos/validate-refresh-token-auth.dto';

export type ValidateRefreshTokenAuthRequestProps = z.infer<
  typeof validateRefreshTokenAuthRequestSchema
>;

export type ValidateRefreshTokenAuthMetaProps = {
  ip?: string;
  userAgent?: string;
};

export type ValidateRefreshTokenAuthResponseProps = z.infer<
  typeof validateRefreshTokenAuthResponseSchema
>;
