import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StateEvent } from 'src/model/event';
import { StateService } from 'src/service/state.service';

@Controller('api/state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get('item/:name')
  async getState(@Param('name') name: string) {
    return this.stateService.findByKey(name);
  }

  @Put('update')
  async updateState(@Body() event: StateEvent) {
    return this.stateService.update(event);
  }
}
