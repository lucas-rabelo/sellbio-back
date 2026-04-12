import { HttpStatus } from "@nestjs/common";
import { DEFAULT_MESSAGES } from "../constants";
import { ApplicationException } from "./application.exception";

export class BadRequestUpdateException extends ApplicationException {
  constructor() {
    super(DEFAULT_MESSAGES.ERROR_UPDATE, HttpStatus.BAD_REQUEST);
  }
}