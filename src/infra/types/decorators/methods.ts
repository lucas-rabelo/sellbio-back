import type { ZodDto } from "nestjs-zod";

type AppPostProps = {
  path?: string,
  summary: string,
  body: ZodDto,
  okResponse?: ZodDto
};

type ParamProps = {
  name: string;
  type: string;
}

type AppGetProps = {
  path?: string,
  param: ParamProps | ZodDto;
  summary: string,
  okResponse: ZodDto
};

type AppPutProps = AppPostProps & {
  param: ParamProps;
};

type AppPatchProps = Omit<AppPostProps, "body"> & {
  param: ParamProps;
};

type AppGetListProps = Omit<AppGetProps, 'param'> & {
  query: ZodDto;
};

type AppDeleteProps = {
  path?: string,
  param: {
    name: string,
    type: string | ZodDto,
  }
  summary: string,
  okResponse: ZodDto
};

export type {
  AppDeleteProps,
  AppGetListProps,
  AppGetProps, AppPatchProps, AppPostProps,
  AppPutProps
};

