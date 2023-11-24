import { Module } from '@nestjs/common';
import { DatabaseModule, RmqModule } from 'libs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './lists/todo.module';

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
  ],
})
export class AppModule {}
