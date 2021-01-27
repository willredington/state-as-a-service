import { StateEvent } from 'saas-common';

export interface Reducer<T = any> {
  reduce(props: T, event: StateEvent): [boolean, T];
}
