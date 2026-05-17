import z from 'zod';

export const deactivateUserRequestSchema = z.uuid();

export const deactivateUserResponseSchema = z.void();
