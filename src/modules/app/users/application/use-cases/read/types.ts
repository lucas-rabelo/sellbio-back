import { findByUuidRequestSchema } from '@/src/infra';
import type z from 'zod';
import type {
  readUserResponseSchema
} from '../../../dtos';

export type ReadUserRequestProps = z.infer<typeof findByUuidRequestSchema>;

export type ReadUserResponseProps = z.infer<typeof readUserResponseSchema>;
