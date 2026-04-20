import type { AppPutProps } from "@/app/infra/types/decorators/methods";
import { applyDecorators, HttpCode, Put } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function AppPut({ path, param, summary, okResponse, httpCode }: AppPutProps) {
  const ApiParamDecorator = param ? ApiParam(param) : () => { };
  const ApiOkResponseDecorator = okResponse ? ApiOkResponse({ type: okResponse }) : () => { };
  const HttpCodeDecorator = httpCode ? HttpCode(httpCode) : () => { };

  return applyDecorators(
    Put(path),
    ApiParamDecorator,
    ApiOperation({ summary }),
    ApiOkResponseDecorator,
    HttpCodeDecorator
  );
};
