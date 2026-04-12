import type { AppGetProps } from "@/infra/types/decorators";
import { applyDecorators, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function AppGet({ path, param, summary, okResponse }: AppGetProps) {
  return applyDecorators(
    Get(path),
    ApiParam(param),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  );
};
