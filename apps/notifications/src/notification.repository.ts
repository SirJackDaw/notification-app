import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Notification } from './schemas/notificaton.schema';
import { Model, Connection } from 'mongoose';

@Injectable()
export class NotificationRepository {
    protected readonly logger = new Logger(NotificationRepository.name)

    constructor(
        @InjectModel(Notification.name) notificationModel: Model<Notification>, @InjectConnection() connection: Connection,
    ) {}
}