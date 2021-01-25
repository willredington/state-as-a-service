import { Module } from '@nestjs/common';
import { StateRegistryResolver } from './state-registry.resolver';

@Module({
  providers: [StateRegistryResolver]
})
export class SchemaModule {}
