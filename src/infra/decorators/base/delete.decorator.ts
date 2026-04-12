import type { AppDeleteProps } from "@/infra/types/decorators";
import { applyDecorators, Delete } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function AppDelete({ path, param, summary, okResponse }: AppDeleteProps) {
  return applyDecorators(
    Delete(path),
    ApiParam(param),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  );
};
