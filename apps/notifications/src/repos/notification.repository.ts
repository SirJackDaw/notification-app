import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Notification } from '../schemas/notificaton.schema';
import { Model, Connection, InsertManyOptions } from 'mongoose';
import { AbstractRepository } from 'libs/common';

@Injectable()
export class NotificationRepository extends AbstractRepository<Notification> {
    protected readonly logger = new Logger(NotificationRepository.name)

    constructor(@InjectModel(Notification.name) notificationModel: Model<Notification>, @InjectConnection() connection: Connection) {
        super(notificationModel, connection)
    }

    async createMany(documents: Partial<Notification>[], options?: InsertManyOptions): Promise<Notification[]> {
        return this.model.insertMany(documents, options)
    }
}