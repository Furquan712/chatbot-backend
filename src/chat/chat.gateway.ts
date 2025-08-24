import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('ChatGateway');

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { event: string; data: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log(`Received message from client ${client.id}: ${JSON.stringify(data)}`);
    // Extract the actual message content and broadcast it.
    this.server.emit('message', data.data);
  }
}