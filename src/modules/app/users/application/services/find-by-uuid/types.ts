import z from 'zod';
import type { findByUuidUserRequestSchema, findByUuidUserResponseSchema } from '../../../dtos/find-by-uuid.dto';

export type FindByUuidUserRequestProps = z.infer<typeof findByUuidUserRequestSchema>;
export type FindByUuidUserResponseProps = z.infer<typeof findByUuidUserResponseSchema>;
