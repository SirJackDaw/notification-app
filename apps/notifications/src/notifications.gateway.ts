import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Socket, Server } from 'socket.io'

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server
  private logger: Logger = new Logger('NotificationGateway')

  constructor(@Inject('AUTH') private authClient: ClientProxy, private readonly configService: ConfigService){}

  afterInit(server: Server) {
    this.logger.log('Websocket Server Init')
  }

  async handleDisconnect(socket: Socket) {
    this.logger.log(`${socket.id} disconnected`)
  }

  async handleConnection(socket: Socket, ...args: any[]) {
    this.logger.log(`connection attempt`)
    const userId = await this.authSocket(socket)

    if (!userId) {
      return socket.disconnect()
    }

    socket.join(userId)

    this.logger.log(`User ${userId} connected: ${socket.id}`)
  }

  async authSocket(socket: Socket): Promise<string> {
    /*
      Postman can't use this
      const token = socket.handshake.auth.token
    */
    const token = socket.handshake.headers.authorization

    const userId = await lastValueFrom(this.authClient.send('validate_user', { Authentication: token})
      .pipe(
        map((res) => res),
        catchError((e) => { this.logger.error(e); return null}),
      )
    )

    return userId
  }

  notify<T>(room: string, event: string, data: T): void {
    this.server.to(room).emit(event, data);
  }
}

