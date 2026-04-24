import { createZodDto } from "nestjs-zod";
import { createUserRequestSchema } from "../../users/dtos/create-user.dto";
import { loginAuthResponseSchema } from "./login-auth.dto";

const registerAuthRequestSchema = createUserRequestSchema;

const registerAuthResponseSchema = loginAuthResponseSchema;

class RegisterAuthRequestDto extends createZodDto(registerAuthRequestSchema) { };

class RegisterAuthResponseDto extends createZodDto(registerAuthResponseSchema) { };

export { RegisterAuthRequestDto, RegisterAuthResponseDto, registerAuthRequestSchema, registerAuthResponseSchema };
