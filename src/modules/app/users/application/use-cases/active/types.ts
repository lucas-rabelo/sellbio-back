import z from "zod";
import { activeUserRequestSchema, activeUserResponseSchema } from "../../../dtos/active-user.dto";

type ActiveUserRequestProps = z.infer<typeof activeUserRequestSchema>;

type ActiveUserResponseProps = z.infer<typeof activeUserResponseSchema>;

export type { ActiveUserRequestProps, ActiveUserResponseProps };
