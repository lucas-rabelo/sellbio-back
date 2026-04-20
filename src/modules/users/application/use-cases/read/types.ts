import type z from "zod";
import type { readUserRequestSchema, readUserResponseSchema } from "../../../dtos/read-user-request.dto";

export type ReadUserRequestProps = z.infer<typeof readUserRequestSchema>;

export type ReadUserResponseProps = z.infer<typeof readUserResponseSchema>;