import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { AuthGuard } from 'libs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  getNotifications(@Query() query: { read: boolean, page: number, perPage: number }) {
    return this.notificationsService.getAllNotifications(query)
  }

  @UseGuards(AuthGuard)
  @Get('read/:id')
  markReaded(@Param() id: string): string {
    return 
  }

  @UseGuards(AuthGuard)
  @Get('read/all')
  markAll(@Param() id: string): string {
    return 
  }

  // @Get()
  // sendNotification() {
  //   return this.notificationsService.sendNotifications({
  //     receivers: ['hui'], 
  //     header: 'hello', 
  //     message: 'world', 
  //     additionalData: {
  //       type: 'websocket',
  //       isIs: true,
  //     }
  //   }, 'event')
  // }
}
