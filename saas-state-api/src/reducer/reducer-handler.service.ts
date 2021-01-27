import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ActionHandlerService } from 'src/handler/handler.service';
import { StateEvent } from 'src/model/event';
import { SchemaFactory } from 'src/schema';
import { RegistryService } from '../service/registry.service';

@Injectable()
export class ReducerHandlerService {
  private readonly logger = new Logger(ReducerHandlerService.name);

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly registryService: RegistryService,
    private readonly handlerService: ActionHandlerService,
  ) {}

  private async getRegistry(name: string) {
    const registry = await this.registryService.findRegistryByName(name);

    if (!registry) {
      this.logger.error('could not find registry');
      throw new NotFoundException();
    }

    return registry;
  }

  private async getAction(event: StateEvent) {
    const registry = await this.getRegistry(event.registryName);
    const reducer = await this.registryService.findReducerByRegistry(
      registry.id,
    );

    if (!reducer) {
      this.logger.error('could not find reducer');
      throw new NotFoundException();
    }

    const action = this.registryService.findAction(
      event.actionName,
      reducer.id,
    );

    if (!action) {
      this.logger.error('could not find action');
      throw new NotFoundException();
    }

    return action;
  }

  async getDefault(registryName: string) {
    const registry = await this.getRegistry(registryName);
    const schema = await this.registryService.findSchema(registry.id);

    const schemaFactory: SchemaFactory = await this.moduleRef.get(
      schema.schemaFactoryClz,
    );

    return schemaFactory.generate();
  }

  async reduce(event: StateEvent, currentState: any) {
    const action = await this.getAction(event);
    return this.handlerService.handle(action, event.payload, currentState);
  }
}
