import { createZodDto } from "nestjs-zod";
import z from "zod";

const loginAuthRequestSchema = z.object({
  email: z.email(),
  password: z.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Deve conter pelo menos um número')
    .regex(/[\W_]/, 'Deve conter pelo menos um caractere especial (ex: @, #, $, %)'),
});

const loginAuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

class LoginAuthRequestDto extends createZodDto(loginAuthRequestSchema) { };

class LoginAuthResponseDto extends createZodDto(loginAuthResponseSchema) { };

export { LoginAuthRequestDto, loginAuthRequestSchema, LoginAuthResponseDto, loginAuthResponseSchema };
