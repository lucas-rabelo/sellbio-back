import z from 'zod';

export const activeUserRequestSchema = z.uuid();

export const activeUserResponseSchema = z.void();
