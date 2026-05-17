import { HttpStatus } from '@nestjs/common';
import { DEFAULT_MESSAGES } from '../constants';
import { ApplicationException } from './application.exception';

export class BadRequestUpdateException extends ApplicationException {
  constructor(message: string) {
    super(
      DEFAULT_MESSAGES.ERROR_UPDATE + ` ${message}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
