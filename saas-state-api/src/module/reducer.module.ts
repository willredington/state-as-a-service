import { Module } from '@nestjs/common';
import { CommonReducerService } from 'src/reducer/common-reducer.service';
import { ReducerHandlerService } from 'src/reducer/reducer-handler.service';
import { DateValidator } from 'src/validator/date';
import { CommonModule } from './common.module';

@Module({
  imports: [CommonModule],
  providers: [CommonReducerService, ReducerHandlerService, DateValidator],
  exports: [CommonReducerService, ReducerHandlerService, DateValidator],
})
export class ReducerModule {}
