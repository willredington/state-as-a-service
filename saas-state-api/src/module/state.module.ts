import { Module } from '@nestjs/common';
import { RegistryController } from 'src/controller/registry.controller';
import { StateController } from 'src/controller/state.controller';
import { BootstrapService } from 'src/service/bootstrap.service';
import { RedisService } from 'src/service/redis.service';
import { StateService } from 'src/service/state.service';
import { CommonModule } from './common.module';
import { ReducerModule } from './reducer.module';

@Module({
  imports: [CommonModule, ReducerModule],
  controllers: [StateController, RegistryController],
  providers: [RedisService, StateService, BootstrapService],
})
export class StateModule {}
