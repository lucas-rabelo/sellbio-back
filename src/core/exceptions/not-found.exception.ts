import { HttpStatus } from "@nestjs/common";
import { DEFAULT_MESSAGES } from "../constants";
import { ApplicationException } from "./application.exception";

export class NotFoundException extends ApplicationException {
  constructor() {
    super(DEFAULT_MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}