import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateController } from 'src/controller/state.controller';
import { StateRegistryRepository } from 'src/repository/registry';
import { CommonReducerService } from 'src/service/common-reducer.service';
import { RedisService } from 'src/service/redis.service';
import { ReducerHandlerService } from 'src/service/reducer-handler.service';
import { StateService } from 'src/service/state.service';

@Module({
  imports: [TypeOrmModule.forFeature([StateRegistryRepository])],
  controllers: [StateController],
  providers: [
    RedisService,
    StateService,
    CommonReducerService,
    ReducerHandlerService,
  ],
})
export class StateModule {}
