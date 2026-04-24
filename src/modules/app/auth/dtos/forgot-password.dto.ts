import { createZodDto } from "nestjs-zod";
import z from "zod";

const forgotPasswordAuthRequestSchema = z.object({
  email: z.email(),
});

const forgotPasswordAuthResponseSchema = z.object({
  link: z.string(),
});

class ForgotPasswordAuthRequestDto extends createZodDto(forgotPasswordAuthRequestSchema) { };

class ForgotPasswordAuthResponseDto extends createZodDto(forgotPasswordAuthResponseSchema) { }

export { ForgotPasswordAuthRequestDto, ForgotPasswordAuthResponseDto, forgotPasswordAuthRequestSchema, forgotPasswordAuthResponseSchema };
