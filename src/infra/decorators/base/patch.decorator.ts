import type { AppPatchProps } from "@/app/infra/types/decorators/methods";
import { applyDecorators, Patch } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function AppPatch({ path, param, summary, okResponse }: AppPatchProps) {
  return applyDecorators(
    Patch(path),
    ApiParam(param),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  );
};
