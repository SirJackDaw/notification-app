import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { NotificationBody } from "./notificationBody.shema";
import { Type } from "class-transformer";
import { AbstractDocument } from "libs/common";

@Schema({ versionKey: false })
export class Notification extends AbstractDocument {
    @Prop()
    receiver: string;

    @Prop({ type: Date, required: true, default: () => Date.now() })
    created: Date;

    @Prop({ type: Date })
    readDate: Date;

    @Prop({ default: false })
    isRead: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: NotificationBody.name })
    @Type(() => NotificationBody)
    data: NotificationBody;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)