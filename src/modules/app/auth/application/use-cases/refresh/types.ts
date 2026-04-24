import z from 'zod';
import type { refreshAuthRequestSchema, refreshAuthResponseSchema } from '../../../dtos/refresh-auth.dto';

export type RefreshAuthRequestProps = z.infer<typeof refreshAuthRequestSchema>;
export type RefreshAuthResponseProps = z.infer<typeof refreshAuthResponseSchema>;