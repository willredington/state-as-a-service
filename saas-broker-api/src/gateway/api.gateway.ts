import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { StateEvent } from 'src/model/event';
import { StateService } from 'src/service/state.service';

@WebSocketGateway()
export class ApiGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly stateService: StateService) {}

  @SubscribeMessage('update')
  async onAction(@MessageBody() event: StateEvent) {
    const newState = await this.stateService.updateState(event);
    this.server.sockets.emit('updated', newState);
  }
}
