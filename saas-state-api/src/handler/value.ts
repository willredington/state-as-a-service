import { Injectable } from '@nestjs/common';
import { StateAction } from '@prisma/client';
import { set } from 'lodash';
import { Handler } from '.';

@Injectable()
export class SimpleValueHandler implements Handler {
  handler(action: StateAction, payload: any, currentState: any) {
    return set(currentState, action.property, payload);
  }
}
