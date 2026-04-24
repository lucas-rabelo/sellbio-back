import type { AppPatchProps } from "@/infra/types/decorators/methods";
import { applyDecorators, HttpCode, Patch } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function AppPatch({ path, param, summary, okResponse, httpCode }: AppPatchProps) {
  const ApiParamDecorator = param ? ApiParam(param) : () => { };
  const ApiOkResponseDecorator = okResponse ? ApiOkResponse({ type: okResponse }) : () => { };
  const HttpCodeDecorator = httpCode ? HttpCode(httpCode) : () => { };

  return applyDecorators(
    Patch(path),
    ApiParamDecorator,
    ApiOperation({ summary }),
    ApiOkResponseDecorator,
    HttpCodeDecorator
  );
};
