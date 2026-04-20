import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      return {
        user: request.user,
        token: request.token,
      };
    } else {
      throw new NotFoundException(
        'User not founded in request. Use the AuthGuard to get the user.',
      );
    }
  },
);
