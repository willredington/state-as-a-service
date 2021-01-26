import { Module } from '@nestjs/common';
import { RegistryController } from 'src/controller/registry.controller';
import { StateController } from 'src/controller/state.controller';
import { CommonReducerService } from 'src/service/common-reducer.service';
import { RedisService } from 'src/service/redis.service';
import { ReducerHandlerService } from 'src/service/reducer-handler.service';
import { RegistryService } from 'src/service/registry.service';
import { StateService } from 'src/service/state.service';
import { CommonModule } from './common.module';

@Module({
  imports: [CommonModule],
  controllers: [StateController, RegistryController],
  providers: [
    RedisService,
    StateService,
    CommonReducerService,
    ReducerHandlerService,
    RegistryService,
  ],
})
export class StateModule {}
