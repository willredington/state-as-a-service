import { Injectable } from '@nestjs/common';
import { StateEvent } from 'src/model/event';
import { Reducer } from './reducer-handler.service';

export type CommonState = {
  date: string;
};

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
