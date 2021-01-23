import { HttpService, Injectable } from '@nestjs/common';
import { StateEvent } from 'src/model/event';
import { ReducerResponse } from 'src/model/http';
import { StateItem } from 'src/model/state';
import { RedisService } from './redis.service';

@Injectable()
export class StateService {
  constructor(
    private readonly redisService: RedisService,
    private readonly httpService: HttpService,
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
      const reducerResponse = await this.httpService
        .put<ReducerResponse>('http://localhost:7000/api/reducer', {
          state: stateItem,
          event,
        })
        .toPromise();

      if (reducerResponse && reducerResponse.data) {
        const [modified, newProps] = reducerResponse.data;

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
