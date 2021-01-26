import { CreateActionDto } from './action';

export interface CreateRegistryDto {
  stateKey: string;
  reducerKey: string;
  actions: CreateActionDto[];
}
