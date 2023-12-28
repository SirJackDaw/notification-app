import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { AuthGuard, CurrentUser, IdValidationPipe, JwtPayload } from 'libs/common';
import { GetAllQuery } from '../dto/getAllQuery.dto';

@UseGuards(AuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('all')
  getNotifications(@Query() query: GetAllQuery, @CurrentUser() user: JwtPayload) {
    const {read, page, perPage} = query
    
    const limit = +perPage || 10;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    let isRead
    if (read) isRead = read === 'true'

    return this.notificationsService.getAllNotifications({ receiver: user.id, isRead }, limit, skip)
  }

  @Get('mark/:id')
  markReaded(@Param('id', IdValidationPipe) id: string, @CurrentUser() user: JwtPayload) {
    return this.notificationsService.mark({_id: id, receiver: user.id})
  }

  @Get('mark')
  markAll(@CurrentUser() user: JwtPayload) {
    return this.notificationsService.markAll({receiver: user.id})
  }
}
