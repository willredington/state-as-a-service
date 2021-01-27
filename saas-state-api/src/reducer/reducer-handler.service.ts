import { BadRequestException, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { StateEvent } from 'saas-common';
import {
  ActionNotFoundException,
  ActionValidatorNotFoundException,
} from 'src/exception/action';
import { StateItem } from 'src/model/state';
import { Validator } from 'src/validator';
import { RegistryService } from '../service/registry.service';

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

  private async validatePayload(event: StateEvent) {
    const action = await this.registryService.findAction(
      event.type,
      event.stateKey,
    );

    if (!action) {
      throw new ActionNotFoundException();
    }

    const validator: Validator = this.moduleRef.get(action.validatorKey);
    if (!validator) {
      throw new ActionValidatorNotFoundException();
    }

    if (!validator.validate(event.payload)) {
      throw new BadRequestException('payload is invalid');
    }
  }

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
      // validate the incoming event against the registered action
      await this.validatePayload(event);

      const reducer: Reducer = this.moduleRef.get(registryItem.reducerKey);
      return reducer.reduce(stateItem.props, event);
    }
  }
}
