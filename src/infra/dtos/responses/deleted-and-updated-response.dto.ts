import { createZodDto } from "nestjs-zod";
import z from "zod";

const deletedAndUpdatedResponseSchema = z.object({
  success: z.boolean().default(true),
});

class DeletedAndUpdatedResponseDto extends createZodDto(deletedAndUpdatedResponseSchema) { };

export { DeletedAndUpdatedResponseDto, deletedAndUpdatedResponseSchema };
