import { Injectable } from '@nestjs/common';
import { StateEvent } from 'src/model/event';
import { StateProps } from 'src/model/state';
import { Reducer } from './reducer-handler.service';

@Injectable()
export class CommonReducerService implements Reducer {
  reduce(props: StateProps, event: StateEvent): [boolean, StateProps] {
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
