import { findByUuidRequestSchema, voidResponseSchema } from '@/src/infra';
import type z from 'zod';

export type DeleteUserRequestProps = z.infer<typeof findByUuidRequestSchema>;

export type DeleteUserResponseProps = z.infer<typeof voidResponseSchema>;
