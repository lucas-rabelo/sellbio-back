import type { AuthenticatedRequest } from '@/src/core/types/user-decorator';
import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
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

    if (request.user) {
      return {
        meta: {
          ip,
          userAgent,
        },
        user: request.user,
        token: request.token,
      };
    }

    throw new NotFoundException(
      'User not founded in request. Use the AuthGuard to get the user.',
    );
  },
);
