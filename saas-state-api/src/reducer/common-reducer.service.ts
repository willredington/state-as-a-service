import { Injectable } from '@nestjs/common';
import { CommonState, StateEvent } from 'saas-common';
import { Reducer } from '.';

@Injectable()
export class CommonReducerService implements Reducer<CommonState> {
  initial() {
    return {
      date: new Date().toISOString().slice(0, 10),
    };
  }

  reduce(props: CommonState, event: StateEvent): [boolean, CommonState] {
    switch (event.type) {
      case 'SET_DATE':
        return [
          true,
          {
            ...props,
            date: event.payload,
          },
        ];
      default:
        return [false, props];
    }
  }
}
