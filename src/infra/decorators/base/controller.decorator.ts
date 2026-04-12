import { BadRequestResponseDto } from "@/core/errors";
import { applyDecorators, Controller } from "@nestjs/common";
import { 
  ApiBadRequestResponse, 
  ApiBearerAuth, 
  ApiInternalServerErrorResponse, 
  ApiTags, 
  ApiUnauthorizedResponse 
} from "@nestjs/swagger";

export function AppController(prefix: string) {
  return applyDecorators(
    ApiTags(prefix),
    Controller(prefix.toLowerCase()),
    ApiBearerAuth(),
    ApiBadRequestResponse({ type: BadRequestResponseDto }),
    ApiUnauthorizedResponse({ type: BadRequestResponseDto }),
    ApiInternalServerErrorResponse({ type: BadRequestResponseDto }),
  )
}