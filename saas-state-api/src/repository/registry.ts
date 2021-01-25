import { StateRegistryItem } from 'src/entity/registry';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(StateRegistryItem)
export class StateRegistryRepository extends Repository<StateRegistryItem> {
  findByStateKey(key: string) {
    return this.findOne({ stateKey: key });
  }
}
