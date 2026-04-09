import 'dotenv/config';
import { envSchema } from './env.schema';

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error);
  throw new Error('Invalid environment variables');
}

export const env = _env.data;