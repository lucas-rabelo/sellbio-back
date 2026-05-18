import { HttpStatus } from '@nestjs/common';
import { ApplicationException } from './application.exception';

export class InternalServerErrorException extends ApplicationException {
  constructor(context: string, message: string) {
    super(`${context} - ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
