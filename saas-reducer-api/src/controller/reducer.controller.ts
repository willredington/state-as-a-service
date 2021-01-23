import { Body, Controller, Put } from '@nestjs/common';
import { ReduceStateDto } from 'src/dto/reducer';
import { ReducerHandlerService } from '../service/reducer-handler.service';

@Controller('api/reducer')
export class ReducerController {
  constructor(private readonly handler: ReducerHandlerService) {}

  @Put()
  async reduce(@Body() payload: ReduceStateDto) {
    return this.handler.update(payload.state, payload.event);
  }
}
