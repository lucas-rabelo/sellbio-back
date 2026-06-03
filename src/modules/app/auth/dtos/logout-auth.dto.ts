import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const logoutAuthRequestSchema = z.object({
  userUuid: z.string(),
  tokenUuid: z.string(),
});

class LogoutAuthRequestDto extends createZodDto(logoutAuthRequestSchema) {}

export { LogoutAuthRequestDto, logoutAuthRequestSchema };
