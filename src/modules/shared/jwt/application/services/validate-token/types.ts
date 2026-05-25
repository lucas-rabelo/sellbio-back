import type z from 'zod';
import type { validateTokenJwtResponseSchema } from '../../../dtos/validate-token.dto';

export type ValidateTokenResponseProps = z.infer<
  typeof validateTokenJwtResponseSchema
>;
