import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server
  private logger: Logger = new Logger('AppGateway')

  constructor(private readonly configService: ConfigService){}

  afterInit(server: Server) {
    this.logger.log('Websocket Server Init')
  }

  async handleDisconnect(socket: Socket) {
    this.logger.log(`${socket.id} disconnected`)
  }

  async handleConnection(socket: Socket, ...args: any[]) {
    const userId = await this.authSocket(socket)

    if (!userId) {
      return socket.disconnect()
    }

    socket.join(userId)

    this.logger.log(`User ${userId} connected: ${socket.id}`)
  }

  async authSocket(socket: Socket): Promise<string> {
    const token = socket.handshake.auth.token

    return socket.id
  }
}

