import { ActionItem } from 'src/entity/action';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ActionItem)
export class ActionRepository extends Repository<ActionItem> {}
