import { findByEmailRequestSchema } from '@/src/infra';
import z from 'zod';
import type {
  findByEmailUserResponseSchema
} from '../../../dtos';

export type FindByEmailUserRequestProps = z.infer<
  typeof findByEmailRequestSchema
>;

export type FindByEmailUserResponseProps = z.infer<
  typeof findByEmailUserResponseSchema
>;
