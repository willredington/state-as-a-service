import { HttpModule, Module } from '@nestjs/common';
import { ApiGateway } from './gateway/api.gateway';
import { StateService } from './service/state.service';

@Module({
  imports: [HttpModule],
  providers: [ApiGateway, StateService],
})
export class AppModule {}
