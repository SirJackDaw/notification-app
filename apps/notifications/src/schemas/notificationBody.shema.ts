import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class NotificationBody extends AbstractDocument {
  @Prop({ type: String })
  header: string;

  @Prop({ type: String })
  message: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  additionalData: Object;
}

export const NotificationBodySchema = SchemaFactory.createForClass(NotificationBody);