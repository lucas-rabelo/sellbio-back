import { listResponseSchema } from "@/infra";
import z from "zod";
import { ReadUserResponseDto, readUserResponseSchema } from "./read-user-response.dto";
import { createZodDto } from "nestjs-zod";

const listUserResponseSchema = z.object({
  ...listResponseSchema.shape,
  data: z.array(readUserResponseSchema),
});

class ListUserResponseDto extends createZodDto(listUserResponseSchema) { };

export { listUserResponseSchema, ListUserResponseDto };
