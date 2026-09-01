import { findByUuidRequestSchema, voidResponseSchema } from '@/src/infra';
import type z from 'zod';

export type DeactivateUserRequestProps = z.infer<
  typeof findByUuidRequestSchema
>;

export type DeactivateUserResponseProps = z.infer<
  typeof voidResponseSchema
>;
