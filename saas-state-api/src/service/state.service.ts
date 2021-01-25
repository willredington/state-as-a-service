import { Injectable } from '@nestjs/common';
import { StateEvent } from 'src/model/event';
import { StateItem } from 'src/model/state';
import { RedisService } from './redis.service';
import { ReducerHandlerService } from './reducer-handler.service';

@Injectable()
export class StateService {
  constructor(
    private readonly redisService: RedisService,
    private readonly reducerHandlerService: ReducerHandlerService,
  ) {}

  async getStateItem(name: string) {
    const payload = await this.redisService.getItem(name);
    if (payload) {
      return JSON.parse(payload) as StateItem;
    }
  }

  async createStateItem(incomingItem: StateItem) {
    const item = await this.getStateItem(incomingItem.name);
    if (!item) {
      await this.redisService.setItem(
        incomingItem.name,
        JSON.stringify(incomingItem),
      );
    }
  }

  async updateStateItem(event: StateEvent): Promise<StateItem> {
    const stateItem = await this.getStateItem(event.stateKey);

    if (stateItem) {
      const reducerResult = await this.reducerHandlerService.reduce(
        stateItem,
        event,
      );

      if (reducerResult) {
        const [modified, newProps] = reducerResult;

        if (modified && newProps) {
          const newState = {
            ...stateItem,
            props: newProps,
          };

          await this.redisService.setItem(
            event.stateKey,
            JSON.stringify(newState),
          );

          return newState;
        }
      }
    }
  }
}
