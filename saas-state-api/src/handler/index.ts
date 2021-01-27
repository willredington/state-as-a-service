import { StateAction, StateSchema } from '@prisma/client';
import { StateEvent } from 'saas-common';

export interface Handler<T = any> {
  handler(action: StateAction, payload: any, currentState: T): T;
}
