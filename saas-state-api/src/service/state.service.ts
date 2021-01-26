import { Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { StateEvent } from 'src/model/event';
import { StateItem } from 'src/model/state';
import { RedisService } from './redis.service';
import { ReducerHandlerService } from './reducer-handler.service';

@Injectable()
export class StateService {
  private readonly logger = new Logger(StateService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly reducerHandlerService: ReducerHandlerService,
  ) {}

  private async create(key: string) {
    const props = await this.reducerHandlerService.getDefault(key);
    await this.redisService.setItem(key, JSON.stringify(props));
    return props;
  }

  async findByKey(key: string) {
    const payload = await this.redisService.getItem(key);

    if (!payload || isEmpty(JSON.parse(payload))) {
      this.logger.debug('setting value in redis cache');
      return await this.create(key);
    }

    return JSON.parse(payload);
  }

  async update(event: StateEvent): Promise<StateItem> {
    const stateItem = await this.findByKey(event.stateKey);

    if (stateItem) {
      const reducerResult = await this.reducerHandlerService.reduce(
        stateItem,
        event,
      );

      if (reducerResult) {
        const [modified, newProps] = reducerResult;

        if (modified && newProps) {
          this.logger.debug(
            'properties have changed, setting value in redis cache',
          );
          await this.redisService.setItem(
            event.stateKey,
            JSON.stringify(newProps),
          );

          return newProps;
        }
      }
    }
  }
}
