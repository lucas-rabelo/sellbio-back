import { createZodDto } from "nestjs-zod";
import z from "zod";
import { createUserResponseSchema } from "../../users/dtos/create-user.dto";

const createRefreshTokenRequestSchema = createUserResponseSchema;

const createRefreshTokenResponseSchema = z.object({
  refreshToken: z.string(),
});

class CreateRefreshTokenResponseDto extends createZodDto(createRefreshTokenResponseSchema) { };

export { createRefreshTokenRequestSchema, CreateRefreshTokenResponseDto, createRefreshTokenResponseSchema };
