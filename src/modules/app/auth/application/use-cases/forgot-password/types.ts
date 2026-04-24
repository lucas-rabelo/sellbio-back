import type z from "zod";
import type { forgotPasswordAuthRequestSchema, forgotPasswordAuthResponseSchema } from "../../../dtos/forgot-password.dto";

export type ForgotPasswordAuthRequestProps = z.infer<typeof forgotPasswordAuthRequestSchema>;

export type ForgotPasswordAuthResponseProps = z.infer<typeof forgotPasswordAuthResponseSchema>;
