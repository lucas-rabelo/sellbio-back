import type z from "zod";
import type { validateAccessTokenRequestSchema, validateAccessTokenResponseSchema } from "../../../dtos/validate-access-token.dto";
import type { JwtVerifyOptions } from "@nestjs/jwt";

export type ValidateTokenJwtRequestProps = z.infer<typeof validateAccessTokenRequestSchema> & {
  options: JwtVerifyOptions;
};

export type ValidateTokenJwtResponseProps = z.infer<typeof validateAccessTokenResponseSchema>;
