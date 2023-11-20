import { Injectable, Logger } from '@nestjs/common';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationGateway } from '../notifications.gateway';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotifyService {
  protected readonly logger = new Logger(NotifyService.name)
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly gateway: NotificationGateway,
    ) {}

  async notify(notificationData: NotificationDto, event: string) {
    return this.notificationService.createNotifications(notificationData).then(notifications => {
        notifications.forEach(notification => this.gateway.server.to(notification.receiver).emit(event, notification))
    })
  }
}
