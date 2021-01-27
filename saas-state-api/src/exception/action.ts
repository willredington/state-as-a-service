import { HttpException, HttpStatus } from '@nestjs/common';

export class ActionNotFoundException extends HttpException {
  constructor() {
    super('action not found', HttpStatus.NOT_FOUND);
  }
}

export class ActionValidatorNotFoundException extends HttpException {
  constructor() {
    super('action validator not found', HttpStatus.NOT_FOUND);
  }
}
