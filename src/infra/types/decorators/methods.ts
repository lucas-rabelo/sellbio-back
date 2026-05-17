import type { ApiParamOptions } from '@nestjs/swagger';
import type { ZodDto } from 'nestjs-zod';

type AppMethodProps = {
  path?: string;
  summary: string;
  body?: ZodDto;
  query?: ZodDto;
  okResponse?: ZodDto;
  param?: ApiParamOptions;
  httpCode?: number;
};

type AppPostProps = Omit<AppMethodProps, 'query' | ''>;

type AppGetProps = Omit<AppMethodProps, 'body'>;

type AppPutProps = Omit<AppMethodProps, 'query'>;

type AppPatchProps = Omit<AppMethodProps, 'body' | 'query'>;

type AppDeleteProps = Omit<AppMethodProps, 'body' | 'query'>;

export type {
  AppDeleteProps,
  AppGetProps,
  AppPatchProps,
  AppPostProps,
  AppPutProps,
};
