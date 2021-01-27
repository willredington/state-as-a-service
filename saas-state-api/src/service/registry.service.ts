import { Injectable } from '@nestjs/common';
import { CreateActionDto } from 'src/dto/action';
import { StateNotRegisteredException } from 'src/exception/state';
import { DbService } from './db.service';

@Injectable()
export class RegistryService {
  constructor(private readonly dbService: DbService) {}

  async findSchema(registryId: number) {
    return this.dbService.stateSchema.findFirst({
      where: {
        registryId,
      },
    });
  }

  async findValidator(validatorId: number) {
    return this.dbService.stateValidator.findFirst({
      where: {
        id: validatorId,
      },
    });
  }

  async findHandler(handlerId: number) {
    return this.dbService.stateHandler.findFirst({
      where: {
        id: handlerId,
      },
    });
  }

  async findRegistry(registryId: number) {
    return this.dbService.stateRegistry.findFirst({
      where: {
        id: registryId,
      },
    });
  }

  async findRegistryByName(name: string) {
    const result = await this.dbService.stateRegistry.findFirst({
      where: {
        name,
      },
    });

    if (!result) {
      throw new StateNotRegisteredException();
    }

    return result;
  }

  async findReducer(reducerId: number) {
    return this.dbService.stateReducer.findFirst({
      where: {
        id: reducerId,
      },
    });
  }

  async findReducerByRegistry(registryId: number) {
    return this.dbService.stateReducer.findFirst({
      where: {
        registryId,
      },
    });
  }

  async findAction(actionName: string, reducerId: number) {
    return this.dbService.stateAction.findFirst({
      where: {
        name: actionName,
        reducerId,
      },
    });
  }

  async createOrGetValidator(validatorClzName: string) {
    const validator = await this.dbService.stateValidator.findFirst({
      where: {
        validatorClz: validatorClzName,
      },
    });

    if (!validator) {
      return this.dbService.stateValidator.create({
        data: {
          validatorClz: validatorClzName,
        },
      });
    }

    return validator;
  }

  async createOrGetHandler(
    handlerName: string,
    handlerClz: string,
    validatorClz: string,
  ) {
    const validator = await this.createOrGetValidator(validatorClz);
    const handler = await this.dbService.stateHandler.findFirst({
      where: {
        name: handlerName,
        handlerClz,
      },
    });

    if (!handler) {
      return this.dbService.stateHandler.create({
        data: {
          name: handlerName,
          handlerClz,
          validator: {
            connect: {
              id: validator.id,
            },
          },
        },
      });
    }

    return handler;
  }

  async createAction(dto: CreateActionDto) {
    const handler = await this.createOrGetHandler(
      dto.handlerName,
      dto.handlerClz,
      dto.validatorClz,
    );

    return this.dbService.stateAction.create({
      data: {
        name: dto.actionName,
        actionType: dto.actionType,
        property: dto.property,
        propertyType: dto.propertyType,
        handler: {
          connect: {
            id: handler.id,
          },
        },
        reducer: {
          connect: {
            id: dto.reducerId,
          },
        },
      },
    });
  }

  async getOrCreateReducer(name: string, registryId: number) {
    const reducer = await this.dbService.stateReducer.findFirst({
      where: {
        name,
      },
    });

    if (!reducer) {
      return this.dbService.stateReducer.create({
        data: {
          name,
          registry: {
            connect: {
              id: registryId,
            },
          },
        },
      });
    }

    return reducer;
  }

  async createRegistry(name: string) {
    return await this.dbService.stateRegistry.create({
      data: {
        name,
      },
    });
  }

  async createSchema(schemaFactoryClz: string, registryId: number) {
    const schema = await this.dbService.stateSchema.findFirst({
      where: {
        schemaFactoryClz,
      },
    });

    if (!schema) {
      return this.dbService.stateSchema.create({
        data: {
          schemaFactoryClz,
          registry: {
            connect: {
              id: registryId,
            },
          },
        },
      });
    }

    return schema;
  }
}
