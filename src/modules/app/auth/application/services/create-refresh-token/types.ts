import z from "zod";
import type { createRefreshTokenRequestSchema, createRefreshTokenResponseSchema } from "../../../dtos/create-refresh-token.dto";

export type CreateRefreshTokenJwtAuthRequestProps = z.infer<typeof createRefreshTokenRequestSchema>;

export type CreateRefreshTokenJwtAuthResponseProps = z.infer<typeof createRefreshTokenResponseSchema>;