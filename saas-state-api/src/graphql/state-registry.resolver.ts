import { Resolver } from '@nestjs/graphql';
import { StateRegistry } from './entity/state-registry';

@Resolver((of) => StateRegistry)
export class StateRegistryResolver {}
