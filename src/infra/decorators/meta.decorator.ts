import type { AuthenticatedRequest } from '@/src/core/types/user-decorator';
import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';

export const Meta = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const forwarded = request.headers['x-forwarded-for'];
    let ip: string | undefined;
    if (forwarded) {
      ip =
        forwarded && typeof forwarded === 'string'
          ? forwarded.split(',')[0].trim()
          : forwarded[0];
    } else {
      ip = request.socket.remoteAddress;
    }
    const userAgent = request.headers['user-agent'];

    return {
      meta: {
        ip,
        userAgent,
      },
    };
  },
);
