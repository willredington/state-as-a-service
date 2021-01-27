import { Injectable } from '@nestjs/common';
import { Validator } from '.';

@Injectable()
export class StringValidator implements Validator {
  validate(value: any): boolean {
    return typeof value === 'string';
  }
}
