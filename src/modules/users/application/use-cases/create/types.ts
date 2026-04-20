import type z from "zod";
import type { createUserRequestSchema, createUserResponseSchema } from "../../../dtos/create-user-request.dto";

export type CreateUserRequestProps = z.infer<typeof createUserRequestSchema>;

export type CreateUserResponseProps = z.infer<typeof createUserResponseSchema>;
