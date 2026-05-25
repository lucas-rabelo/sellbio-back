import type { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    uuid: string;
    email: string;
  };
  token?: string;
}

export interface TokenPayload {
  uuid: string;
  email: string;
  iat?: number;
  exp?: number;
}
