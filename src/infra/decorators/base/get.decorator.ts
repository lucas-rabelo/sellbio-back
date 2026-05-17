import type { AppGetProps } from '@/src/infra/types/decorators/methods';
import { applyDecorators, Get, HttpCode } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export function AppGet({
  path,
  param,
  summary,
  okResponse,
  query,
  httpCode,
}: AppGetProps) {
  const ApiParamDecorator = param ? ApiParam(param) : () => {};
  const ApiOkResponseDecorator = okResponse
    ? ApiOkResponse({ type: okResponse })
    : () => {};
  const HttpCodeDecorator = httpCode ? HttpCode(httpCode) : () => {};
  const ApiQueryDecorator = query ? ApiQuery({ type: query }) : () => {};

  return applyDecorators(
    Get(path),
    ApiParamDecorator,
    ApiOperation({ summary }),
    ApiQueryDecorator,
    ApiOkResponseDecorator,
    HttpCodeDecorator,
  );
}
