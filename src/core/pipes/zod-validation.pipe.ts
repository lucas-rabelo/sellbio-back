import { Injectable, type PipeTransform } from '@nestjs/common';

import type { ZodSchema } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const validatedValue = this.schema.parse(value);

    return validatedValue;
  }
}
