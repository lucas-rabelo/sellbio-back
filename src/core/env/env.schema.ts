import { z } from 'zod';
import { APP_NAME, NODE_ENV } from '../constants';

export const envSchema = z.object({
  NODE_ENV: z.enum([NODE_ENV.DEV, NODE_ENV.HML, NODE_ENV.PRD, NODE_ENV.TEST]),
  PORT: z.coerce.number().default(3000),
  APP_NAME: z.string().default(APP_NAME),

  SECRET_ENV: z.string(),
  FRONT_END_URL: z.string(),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASS: z.string(),
  DATABASE_NAME: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;