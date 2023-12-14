import { Injectable, Logger } from '@nestjs/common';
import { NotificationBodyRepository } from '../repos/notificationBody.repository';
import { NotificationRepository } from '../repos/notification.repository';
import { Notification } from './../schemas/notificaton.schema';
import { FilterQuery } from 'mongoose';
import { NotificationDto } from 'libs/common';

@Injectable()
export class NotificationsService {
  protected readonly logger = new Logger(NotificationsService.name)
  constructor(
    private readonly notificationRepository: NotificationRepository, 
    private readonly bodyRepository: NotificationBodyRepository, 
  ) {}

  async createNotifications(notificationData: NotificationDto): Promise<Notification[]> {
    const { receivers, header, message, additionalData } = notificationData
    if (receivers.length === 0) return

    const body = await this.bodyRepository.create({ header, message, additionalData })
    const notifications = receivers.map(receiver => ({ receiver, data: body }));
    return this.notificationRepository.createMany(notifications)
  }

  async getAllNotifications(query) {
    
    return this.notificationRepository.find({})
  }

  async mark(filter: FilterQuery<Notification>) {
    return this.notificationRepository.findOneAndUpdate(filter, { isRead: true, readDate: Date.now() })
  }

  async markAll(filter: FilterQuery<Notification>) {
    return this.notificationRepository.updateMany(filter, { isRead: true, readDate: Date.now() })
  }
}
