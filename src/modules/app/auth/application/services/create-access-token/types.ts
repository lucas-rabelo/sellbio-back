import z from "zod";
import type { createAccessTokenRequestSchema, createAccessTokenResponseSchema } from "../../../dtos/create-access-token.dto";

export type CreateAccessTokenJwtAuthRequestProps = z.infer<typeof createAccessTokenRequestSchema>;

export type CreateAccessTokenJwtAuthResponseProps = z.infer<typeof createAccessTokenResponseSchema>;