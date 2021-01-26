import { Injectable } from '@nestjs/common';
import { CreateRegistryDto } from 'src/dto/registry';
import { StateNotRegisteredException } from 'src/exception/state';
import { DbService } from './db.service';

@Injectable()
export class RegistryService {
  constructor(private readonly dbService: DbService) {}

  async findByStateKey(stateKey: string) {
    const result = await this.dbService.stateRegistry.findFirst({
      where: {
        stateKey,
      },
    });

    if (!result) {
      throw new StateNotRegisteredException();
    }

    return result;
  }

  async create(dto: CreateRegistryDto) {
    return await this.dbService.stateRegistry.create({
      data: {
        stateKey: dto.stateKey,
        reducerKey: dto.reducerKey,
        actions: {
          create: dto.actions.map((item) => ({ actionType: item.actionType })),
        },
      },
    });
  }
}
