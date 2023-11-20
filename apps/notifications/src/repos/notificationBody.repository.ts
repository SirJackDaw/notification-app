import { Injectable, Logger } from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose"
import { Connection, Model } from "mongoose"
import { NotificationBody } from "../schemas/notificationBody.shema"
import { AbstractRepository } from "libs/common"

@Injectable()
export class NotificationBodyRepository extends AbstractRepository<NotificationBody> {
    protected readonly logger = new Logger(NotificationBodyRepository.name)

    constructor(@InjectModel(NotificationBody.name) notificationModel: Model<NotificationBody>, @InjectConnection() connection: Connection) {
        super(notificationModel, connection)
    }
}