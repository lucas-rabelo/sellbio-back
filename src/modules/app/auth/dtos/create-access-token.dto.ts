import { createZodDto } from "nestjs-zod";
import z from "zod";
import { createUserResponseSchema } from "../../users/dtos/create-user.dto";

const createAccessTokenRequestSchema = createUserResponseSchema;

const createAccessTokenResponseSchema = z.object({
  accessToken: z.string(),
});

class CreateAccessTokenResponseDto extends createZodDto(createAccessTokenResponseSchema) { };

export { createAccessTokenRequestSchema, CreateAccessTokenResponseDto, createAccessTokenResponseSchema };
