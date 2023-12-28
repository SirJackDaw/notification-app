import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Notification } from '../schemas/notificaton.schema';
import { Model, Connection, InsertManyOptions, PipelineStage, FilterQuery } from 'mongoose';
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

    async getMany(filter: FilterQuery<Notification>, limit: number, skip: number) {
        return this.model.aggregate([
            { $lookup: { from: 'notificationbodies', localField: 'data', foreignField: '_id', as: 'data' }},
            { $match: filter },
            { $sort: { created: -1 } },
            { $limit: skip+limit },
            { $skip: skip },
            { $set: { data: { $arrayElemAt: ["$data", 0] }}},
          ])
    }

    async counts(filter: FilterQuery<Notification>) {
        let commonPiplines: PipelineStage[] = [
            { $lookup: { from: 'notificationbody', localField: 'data', foreignField: '_id', as: 'data' }},
            { $count: 'total' }
        ]
        const total = await this.model.aggregate([...commonPiplines, {$match: filter }])
        const unread = await this.model.aggregate([...commonPiplines, {$match: {...filter, isRead: false} }])

        return {
            total: total.length > 0 ? total[0].total : 0,
            unread: unread.length > 0 ? unread[0].total : 0,
          }
    }
}