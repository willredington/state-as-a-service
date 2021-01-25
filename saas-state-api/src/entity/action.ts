import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StateRegistryItem } from './registry';

@Entity()
export class ActionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  actionType: string;

  @ManyToOne(() => StateRegistryItem, (item) => item.actions)
  stateItem: StateRegistryItem;
}
