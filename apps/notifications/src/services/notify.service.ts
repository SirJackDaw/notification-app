import { Injectable, Logger } from '@nestjs/common';
import { NotificationGateway } from '../notifications.gateway';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from 'libs/common';

@Injectable()
export class NotifyService {
  protected readonly logger = new Logger(NotifyService.name)
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly gateway: NotificationGateway,
    ) {}

  async notify(notificationData: NotificationDto, event: string = 'notify') {
    this.logger.log(notificationData)
    return this.notificationService.createNotifications(notificationData).then(notifications => {
      notifications.forEach(notification => this.gateway.server.to(notification.receiver).emit(event, notification))
    })
  }
}
