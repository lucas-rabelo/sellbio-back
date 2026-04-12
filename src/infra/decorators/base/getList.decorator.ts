import type { AppGetListProps } from "@/infra/types/decorators";
import { applyDecorators, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";

export function AppGetList({ path, query, summary, okResponse }: AppGetListProps) {
  return applyDecorators(
    Get(path),
    ApiQuery(query),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  );
};
