import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from 'libs/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOption('NOTIFY'))
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
