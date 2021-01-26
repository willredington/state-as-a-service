import { Injectable } from '@nestjs/common';
import { CreateRegistryDto } from 'src/dto/registry';
import { ActionItem } from 'src/entity/action';
import { StateRegistryItem } from 'src/entity/registry';
import { ActionRepository } from 'src/repository/action';
import { StateRegistryRepository } from 'src/repository/registry';

@Injectable()
export class RegistryService {
  constructor(
    private readonly registryRepository: StateRegistryRepository,
    private readonly actionRepository: ActionRepository,
  ) {}

  async findByStateKey(stateKey: string) {
    return this.registryRepository.findByStateKey(stateKey);
  }

  async create(dto: CreateRegistryDto) {
    const registry = await this.registryRepository.save({
      stateKey: dto.stateKey,
      reducerKey: dto.reducerKey,
    });

    const actions = await this.actionRepository.save(
      dto.actions.map((action) => {
        return {
          ...action,
          stateItem: registry,
        } as Partial<ActionItem>;
      }),
    );

    console.log('created actions', actions);

    return this.registryRepository.save({
      ...registry,
      actions,
    }) as Promise<StateRegistryItem>;
  }
}
