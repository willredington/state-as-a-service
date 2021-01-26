import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { StateEvent } from 'src/model/event';
import { StateItem } from 'src/model/state';
import { RegistryService } from './registry.service';

export interface Reducer<T = any> {
  initial(): T;
  reduce(props: T, event: StateEvent): [boolean, T];
}

@Injectable()
export class ReducerHandlerService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly registryService: RegistryService,
  ) {}

  async getDefault(stateKey: string) {
    const registryItem = await this.registryService.findByStateKey(stateKey);

    if (registryItem) {
      const reducer: Reducer = this.moduleRef.get(registryItem.reducerKey);
      return reducer.initial();
    }
  }

  async reduce(stateItem: StateItem, event: StateEvent) {
    const registryItem = await this.registryService.findByStateKey(
      stateItem.name,
    );

    if (registryItem) {
      const reducer: Reducer = this.moduleRef.get(registryItem.reducerKey);
      return reducer.reduce(stateItem.props, event);
    }
  }
}
