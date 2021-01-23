import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { tap } from 'rxjs/operators';
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
    console.log('state event', event);
    return this.stateService.updateState(event).pipe(tap(console.log));
  }
}
