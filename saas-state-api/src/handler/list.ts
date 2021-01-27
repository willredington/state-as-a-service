import { Injectable } from '@nestjs/common';
import { StateAction } from '@prisma/client';
import { set, get } from 'lodash';
import { Handler } from '.';

@Injectable()
export class ListHandler implements Handler {
  handler(action: StateAction, payload: any, currentState: any) {
    return set(currentState, action.property, [
      ...get(currentState, action.property),
      payload,
    ]);
  }
}
