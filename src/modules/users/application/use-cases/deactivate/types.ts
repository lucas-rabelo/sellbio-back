import type z from "zod";
import type { deactivateUserRequestSchema, deactivateUserResponseSchema } from "../../../dtos/deactivate-user-request.dto";

export type DeactivateUserRequestProps = z.infer<typeof deactivateUserRequestSchema>;

export type DeactivateUserResponseProps = z.infer<typeof deactivateUserResponseSchema>;
