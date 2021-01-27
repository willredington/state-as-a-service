import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StateEvent } from 'saas-common';
import { Server } from 'socket.io';
import { StateService } from 'src/service/state.service';

@WebSocketGateway()
export class ApiGateway {
  private readonly logger = new Logger(ApiGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly stateService: StateService) {}

  @SubscribeMessage('update')
  async onUpdateAction(@MessageBody() event: StateEvent) {
    this.logger.debug('incoming event', JSON.stringify(event));
    const newState = await this.stateService.updateState(event);
    this.server.sockets.emit('updated', newState);
  }
}
