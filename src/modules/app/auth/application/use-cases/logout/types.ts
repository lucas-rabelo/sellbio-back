import z from 'zod';
import type { logoutAuthRequestSchema } from '../../../dtos';

export type LogoutAuthRequestProps = z.infer<typeof logoutAuthRequestSchema> & {
  userUuid: string;
};
