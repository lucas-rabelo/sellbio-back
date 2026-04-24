import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const refreshAuthRequestSchema = z.object({
  refreshToken: z.string(),
});

const refreshAuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

class RefreshAuthRequestDto extends createZodDto(refreshAuthRequestSchema) { };
class RefreshAuthResponseDto extends createZodDto(refreshAuthResponseSchema) { };

export { RefreshAuthRequestDto, refreshAuthRequestSchema, RefreshAuthResponseDto, refreshAuthResponseSchema };