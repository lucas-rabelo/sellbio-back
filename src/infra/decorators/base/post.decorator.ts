import type { AppPostProps } from "@/infra/types/decorators/methods";
import { applyDecorators, HttpCode, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function AppPost({ path, param, summary, okResponse, httpCode }: AppPostProps) {
  const ApiParamDecorator = param ? ApiParam(param) : () => { };
  const ApiOkResponseDecorator = okResponse ? ApiOkResponse({ type: okResponse }) : () => { };
  const HttpCodeDecorator = httpCode ? HttpCode(httpCode) : () => { };

  return applyDecorators(
    Post(path),
    ApiParamDecorator,
    ApiOperation({ summary }),
    ApiOkResponseDecorator,
    HttpCodeDecorator
  );
};
