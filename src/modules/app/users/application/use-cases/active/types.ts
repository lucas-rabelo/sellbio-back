import { findByUuidRequestSchema, voidResponseSchema } from '@/src/infra';
import z from 'zod';

type ActiveUserRequestProps = z.infer<typeof findByUuidRequestSchema>;

type ActiveUserResponseProps = z.infer<typeof voidResponseSchema>;

export type { ActiveUserRequestProps, ActiveUserResponseProps };
