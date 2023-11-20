import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import * as Joi from 'joi';
import { MongoModule, RmqModule } from 'libs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { NotificationRepository } from './repos/notification.repository';
import { Notification, NotificationSchema } from './schemas/notificaton.schema';
import { NotificationBody, NotificationBodySchema } from './schemas/notificationBody.shema';
import { NotificationGateway } from './notifications.gateway';
import { NotificationBodyRepository } from './repos/notificationBody.repository';
import { NotifyController } from './controllers/notify.controller';
import { NotifyService } from './services/notify.service';

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
    // RmqModule,
    RmqModule.register('AUTH'),
    MongoModule,
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema }, 
      { name: NotificationBody.name, schema: NotificationBodySchema },
    ])
  ],
  controllers: [NotificationsController, NotifyController],
  providers: [NotificationsService, NotifyService, NotificationRepository, NotificationBodyRepository, NotificationGateway],
})
export class NotificationsModule {}
