import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StateEvent } from 'src/model/event';
import { StateItem } from 'src/model/state';
import { StateService } from 'src/service/state.service';

@Controller('api/state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get('item/:name')
  async getState(@Param('name') name: string) {
    return this.stateService.getStateItem(name);
  }

  @Post('create')
  async createState(@Body() state: StateItem) {
    return this.stateService.createStateItem(state);
  }

  @Put('update')
  async updateState(@Body() event: StateEvent) {
    return this.stateService.updateStateItem(event);
  }
}
