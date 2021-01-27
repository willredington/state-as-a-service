import { Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { StateEvent } from 'saas-common';
import { ReducerHandlerService } from '../reducer/reducer-handler.service';
import { RedisService } from './redis.service';

@Injectable()
export class StateService {
  private readonly logger = new Logger(StateService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly reducerHandlerService: ReducerHandlerService,
  ) {}

  private async create(registryName: string) {
    const props = await this.reducerHandlerService.getDefault(registryName);
    const payload = JSON.stringify(props);

    this.logger.debug('using the following props for default', payload);

    await this.redisService.setItem(registryName, payload);

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

  async update(event: StateEvent) {
    const currentState = await this.findByKey(event.registryName);
    const newState = await this.reducerHandlerService.reduce(
      event,
      currentState,
    );

    if (newState) {
      const payload = JSON.stringify(newState);

      this.logger.debug('got new state', payload);

      await this.redisService.setItem(event.registryName, payload);

      return newState;
    }
  }
}
