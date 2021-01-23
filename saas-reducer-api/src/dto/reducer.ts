import { StateEvent } from 'src/model/event';
import { StateItem } from 'src/model/state';

export type ReduceStateDto = {
  state: StateItem;
  event: StateEvent;
};
