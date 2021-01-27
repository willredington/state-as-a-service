import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGateway } from './gateway/api.gateway';
import { StateService } from './service/state.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [ApiGateway, StateService],
})
export class AppModule {}
