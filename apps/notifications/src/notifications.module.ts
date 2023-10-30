import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import * as Joi from 'joi';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationRepository } from './notification.repository';
import { Notification, NotificationSchema } from './schemas/notificaton.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        APP_PORT: Joi.number().required()
      }),
      envFilePath: './apps/notifications/.env'
    }),
    MongooseModule.forFeature([{name: Notification.name, schema: NotificationSchema}])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationRepository],
})
export class NotificationsModule {}
