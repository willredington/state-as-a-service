import { Injectable } from '@nestjs/common';
import { CreateActionDto } from 'src/dto/action';
import { ActionRepository } from 'src/repository/action';
import { StateRegistryRepository } from 'src/repository/registry';

@Injectable()
export class ActionService {
  constructor(
    private readonly registryRepository: StateRegistryRepository,
    private readonly actionRepository: ActionRepository,
  ) {}

  async create(dto: CreateActionDto) {
    // const actions = await this.actionRepository.findByIds(
    //   createRegistryDto.actionIds,
    // );
  }
}
