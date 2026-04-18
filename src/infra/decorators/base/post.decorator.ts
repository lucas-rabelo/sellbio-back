import type { AppPostProps } from "@/app/infra/types/decorators/methods";
import { applyDecorators, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function AppPost({ path, body, summary, okResponse }: AppPostProps) {
  return applyDecorators(
    Post(path),
    ApiBody({ type: body }),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  );
};
