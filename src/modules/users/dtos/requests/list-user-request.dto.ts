import { ROLE_ENUM } from "@/app/core";
import { listRequestSchema } from "@/app/infra";
import { createZodDto } from "nestjs-zod";
import z from "zod";

const listUserRequestSchema = z.object({
  ...listRequestSchema.shape,
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(['ADMIN', 'AGENCY', 'SELLER']).optional(),
});

class ListUserRequestDto extends createZodDto(listUserRequestSchema) { };

export { listUserRequestSchema, ListUserRequestDto };
