import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateController } from 'src/controller/state.controller';
import { ActionRepository } from 'src/repository/action';
import { StateRegistryRepository } from 'src/repository/registry';
import { ActionService } from 'src/service/action.service';
import { CommonReducerService } from 'src/service/common-reducer.service';
import { RedisService } from 'src/service/redis.service';
import { ReducerHandlerService } from 'src/service/reducer-handler.service';
import { RegistryService } from 'src/service/registry.service';
import { StateService } from 'src/service/state.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StateRegistryRepository, ActionRepository]),
  ],
  controllers: [StateController],
  providers: [
    RedisService,
    StateService,
    CommonReducerService,
    ReducerHandlerService,
    RegistryService,
    ActionService,
  ],
})
export class StateModule {}
