import { HttpStatus } from "@nestjs/common";
import { ApplicationException } from "./application.exception";

export class BadRequestException extends ApplicationException {
  constructor(context: string, message: string) {
    super(`${context} - ${message}`, HttpStatus.BAD_REQUEST);
  }
}