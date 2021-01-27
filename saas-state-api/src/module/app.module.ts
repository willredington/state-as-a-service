import { Module } from '@nestjs/common';
import { CommonModule } from './common.module';
import { ReducerModule } from './reducer.module';
import { StateModule } from './state.module';

@Module({
  imports: [CommonModule, ReducerModule, StateModule],
})
export class AppModule {}
