import { Module } from '@nestjs/common';
import { CommonReducerService } from '../service/common-reducer.service';
import { ReducerHandlerService } from '../service/reducer-handler.service';
import { ReducerController } from '../controller/reducer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateRegistryRepository } from 'src/repository/registry';

@Module({
  imports: [TypeOrmModule.forFeature([StateRegistryRepository])],
  providers: [CommonReducerService, ReducerHandlerService],
  controllers: [ReducerController],
})
export class ReducerModule {}
