import { Module } from '@nestjs/common';
import { CommonModule } from './common.module';
import { StateModule } from './state.module';

@Module({
  imports: [CommonModule, StateModule],
})
export class AppModule {}
