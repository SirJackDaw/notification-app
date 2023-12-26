import { Module } from '@nestjs/common';
import { RmqModule } from 'libs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { DatabaseModule } from './database/database.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env',
    }),
    RmqModule.register('NOTIFY'),
    RmqModule.register('AUTH'),
    DatabaseModule,
    TodoModule,
    CronModule,//needs to be in separate service
  ],
})
export class AppModule {}
