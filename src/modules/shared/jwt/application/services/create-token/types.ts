import type z from 'zod';
import type {
  createTokenJwtRequestSchema,
  createTokenJwtResponseSchema,
} from '../../../dtos/create-token.dto';
import type { JwtSignOptions } from '@nestjs/jwt';

export type CreateTokenRequestProps = {
  user: z.infer<typeof createTokenJwtRequestSchema>;
  options: JwtSignOptions;
};

export type CreateTokenResponseProps = z.infer<
  typeof createTokenJwtResponseSchema
>;
