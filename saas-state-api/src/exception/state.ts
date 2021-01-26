import { HttpException, HttpStatus } from '@nestjs/common';

export class StateNotRegisteredException extends HttpException {
  constructor() {
    super('state registry not found', HttpStatus.NOT_FOUND);
  }
}
