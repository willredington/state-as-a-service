import { HttpModule, Module } from '@nestjs/common';
import { StateController } from 'src/controller/state.controller';
import { RedisService } from 'src/service/redis.service';
import { StateService } from 'src/service/state.service';

@Module({
  imports: [HttpModule],
  controllers: [StateController],
  providers: [RedisService, StateService],
})
export class StateModule {}
