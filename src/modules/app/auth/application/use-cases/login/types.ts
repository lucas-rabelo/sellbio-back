import type z from 'zod';
import type {
  loginAuthRequestSchema,
  loginAuthResponseSchema,
} from '../../../dtos/login-auth.dto';

export type LoginAuthRequestProps = z.infer<typeof loginAuthRequestSchema>;

export type LoginAuthResponseProps = z.infer<typeof loginAuthResponseSchema>;
