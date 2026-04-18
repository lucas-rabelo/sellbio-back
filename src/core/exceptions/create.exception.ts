import { HttpStatus } from "@nestjs/common";
import { DEFAULT_MESSAGES } from "../constants";
import { ApplicationException } from "./application.exception";

export class BadRequestCreateException extends ApplicationException {
  constructor(context: string) {
    super(`${context} - ` + DEFAULT_MESSAGES.ERROR_CREATE, HttpStatus.BAD_REQUEST);
  }
}