import z from 'zod';
import type { logoutAuthRequestSchema } from '../../../dtos/logout-auth.dto';

export type LogoutAuthRequestProps = z.infer<typeof logoutAuthRequestSchema>;
