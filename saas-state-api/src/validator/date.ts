import { Injectable } from '@nestjs/common';
import { Validator } from '.';
import * as moment from 'moment';

@Injectable()
export class DateValidator implements Validator {
  validate(value: any): boolean {
    return (
      typeof value === 'string' &&
      moment(value as string, 'YYYY-MM-DD', true).isValid()
    );
  }
}
