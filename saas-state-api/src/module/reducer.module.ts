import { Module } from '@nestjs/common';
import { ActionHandlerService } from 'src/handler/handler.service';
import { ListHandler } from 'src/handler/list';
import { SimpleValueHandler } from 'src/handler/value';
import { ReducerHandlerService } from 'src/reducer/reducer-handler.service';
import { CommonStateSchemaFactory } from 'src/schema/common';
import { DateValidator } from 'src/validator/date';
import { StringValidator } from 'src/validator/string';
import { CommonModule } from './common.module';

@Module({
  imports: [CommonModule],
  providers: [
    ActionHandlerService,
    SimpleValueHandler,
    ListHandler,
    CommonStateSchemaFactory,
    ReducerHandlerService,
    DateValidator,
    StringValidator,
  ],
  exports: [ReducerHandlerService, DateValidator],
})
export class ReducerModule {}
