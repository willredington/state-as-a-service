import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { StateAction } from '@prisma/client';
import { Validator } from 'src/validator';
import { Handler } from '.';
import { RegistryService } from '../service/registry.service';

@Injectable()
export class ActionHandlerService {
  private readonly logger = new Logger(ActionHandlerService.name);

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly registryService: RegistryService,
  ) {}

  async handle(action: StateAction, payload: any, currentState: any) {
    const handler = await this.registryService.findHandler(action.handlerId);
    const validator = await this.registryService.findValidator(
      handler.validatorId,
    );

    const validatorClz: Validator = await this.moduleRef.get(
      validator.validatorClz,
    );

    const handlerClz: Handler = await this.moduleRef.get(handler.handlerClz);

    // run validation against the payload
    if (!validatorClz.validate(payload)) {
      throw new BadRequestException('payload is not valid');
    }

    // action, payload, schema
    return handlerClz.handler(action, payload, currentState);
  }
}
