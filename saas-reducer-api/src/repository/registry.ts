import { StateRegistry } from 'src/entity/registry';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(StateRegistry)
export class StateRegistryRepository extends Repository<StateRegistry> {
  findByStateKey(key: string) {
    return this.findOne({ stateKey: key });
  }
}
