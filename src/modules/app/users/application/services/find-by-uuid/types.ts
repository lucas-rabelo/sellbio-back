import { findByUuidRequestSchema } from '@/src/infra';
import z from 'zod';
import type {
  findByUuidUserResponseSchema
} from '../../../dtos';

export type FindByUuidUserRequestProps = z.infer<
  typeof findByUuidRequestSchema
>;
export type FindByUuidUserResponseProps = z.infer<
  typeof findByUuidUserResponseSchema
>;
