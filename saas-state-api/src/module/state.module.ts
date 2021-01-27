import { Module } from '@nestjs/common';
import { RegistryController } from 'src/controller/registry.controller';
import { StateController } from 'src/controller/state.controller';
import { RedisService } from 'src/service/redis.service';
import { StateService } from 'src/service/state.service';
import { CommonModule } from './common.module';
import { ReducerModule } from './reducer.module';

@Module({
  imports: [CommonModule, ReducerModule],
  controllers: [StateController, RegistryController],
  providers: [RedisService, StateService],
})
export class StateModule {}
