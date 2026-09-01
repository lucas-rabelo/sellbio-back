import type { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    uuid: string;
    email: string;
  };
  meta: {
    ip?: string;
    userAgent?: string;
  };
  token: string;
}
