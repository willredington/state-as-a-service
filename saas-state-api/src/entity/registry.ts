import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActionItem } from './action';

@Entity()
export class StateRegistryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stateKey: string;

  @Column()
  reducerKey: string;

  @OneToMany(() => ActionItem, (action) => action.stateItem)
  actions: ActionItem[];
}
