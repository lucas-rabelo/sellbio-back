import { HttpStatus } from "@nestjs/common";
import { DEFAULT_MESSAGES } from "../constants";
import { ApplicationException } from "./application.exception";

export class DeleteException extends ApplicationException {
  constructor() {
    super(DEFAULT_MESSAGES.ERROR_DELETE, HttpStatus.BAD_REQUEST);
  }
}