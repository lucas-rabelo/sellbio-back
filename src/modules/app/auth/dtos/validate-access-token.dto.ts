import z from "zod";
import { findByEmailUserResponseSchema } from "../../users/dtos/find-by-email.dto";

const validateAccessTokenRequestSchema = z.object({
  token: z.string(),
});

const validateAccessTokenResponseSchema = findByEmailUserResponseSchema;

export { validateAccessTokenRequestSchema, validateAccessTokenResponseSchema };
