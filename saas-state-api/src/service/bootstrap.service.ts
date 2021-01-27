import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { appConfig } from 'src/config';
import { ClassNotFoundException } from 'src/exception/clz';
import { RegistryService } from './registry.service';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(
    private readonly registryService: RegistryService,
    private readonly moduleRef: ModuleRef,
  ) {}

  private ensureClzExists(clzName: string) {
    if (!!!this.moduleRef.get(clzName)) {
      throw new ClassNotFoundException();
    }
  }

  async onApplicationBootstrap() {
    for (const registryConfig of appConfig.registries) {
      const registry = await this.registryService.createRegistry(
        registryConfig.name,
      );

      await this.registryService.createSchema(
        registryConfig.schemaClz,
        registry.id,
      );

      const reducer = await this.registryService.getOrCreateReducer(
        registryConfig.reducer.name,
        registry.id,
      );

      for (const actionConfig of registryConfig.reducer.actions) {
        await this.registryService.createAction({
          reducerId: reducer.id,
          actionName: actionConfig.name,
          actionType: actionConfig.actionType,
          property: actionConfig.property,
          propertyType: actionConfig.propertyType,
          handlerName: actionConfig.handler.name,
          handlerClz: actionConfig.handler.handlerClz,
          validatorClz: actionConfig.handler.validatorClz,
        });
      }
    }

    this.logger.debug('finished bootstrapping...');
  }
}
