import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StateRegistry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stateKey: string;

  @Column()
  reducer: string;
}
