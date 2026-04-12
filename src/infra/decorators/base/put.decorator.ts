import type { AppPutProps } from "@/infra/types/decorators";
import { applyDecorators, Put } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function AppPut({ path, body, param, summary, okResponse }: AppPutProps) {
  return applyDecorators(
    Put(path),
    ApiParam(param),
    ApiBody({ type: body }),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  );
};
