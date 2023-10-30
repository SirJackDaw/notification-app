import { Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Notification {

}

export const NotificationSchema = SchemaFactory.createForClass(Notification)