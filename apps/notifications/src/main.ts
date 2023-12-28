import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOption('NOTIFY'))

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
