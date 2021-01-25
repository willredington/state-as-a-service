import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { StateEvent } from 'src/model/event';
import { StateItem, StateProps } from 'src/model/state';
import { StateRegistryRepository } from 'src/repository/registry';

export interface Reducer {
  reduce(props: StateProps, event: StateEvent): [boolean, StateProps];
}

@Injectable()
export class ReducerHandlerService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly regRepository: StateRegistryRepository,
  ) {}

  async reduce(stateItem: StateItem, event: StateEvent) {
    const registryItem = await this.regRepository.findByStateKey(
      stateItem.name,
    );

    if (registryItem) {
      const reducer: Reducer = this.moduleRef.get(registryItem.reducerKey);
      return reducer.reduce(stateItem.props, event);
    }
  }
}
