import type z from "zod";
import type { listUserRequestSchema, listUserResponseSchema } from "../../../dtos/list-user.dto";

export type ListUserRequestProps = z.infer<typeof listUserRequestSchema>;

export type ListUserResponseProps = z.infer<typeof listUserResponseSchema>;