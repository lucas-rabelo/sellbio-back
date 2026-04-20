import type { AppDeleteProps } from "@/app/infra/types/decorators/methods";
import { applyDecorators, Delete, HttpCode } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function AppDelete({ path, param, summary, okResponse, httpCode }: AppDeleteProps) {
  const ApiParamDecorator = param ? ApiParam(param) : () => { };
  const ApiOkResponseDecorator = okResponse ? ApiOkResponse({ type: okResponse }) : () => { };
  const HttpCodeDecorator = httpCode ? HttpCode(httpCode) : () => { };

  return applyDecorators(
    Delete(path),
    ApiParamDecorator,
    ApiOperation({ summary }),
    ApiOkResponseDecorator,
    HttpCodeDecorator
  );
};
