import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    context?: any,
  ) {
    super(
      {
        success: false,
        message,
        ...(context ? { context } : {}),
      },
      status,
    );
  }
}
