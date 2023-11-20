import { Module } from '@nestjs/common';
import { DatabaseModule, RmqModule } from 'libs/common';
import { ConfigModule } from '@nestjs/config';
import { ListModule } from './list/list.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env',
    }),
    RmqModule.register('NOTIFY'),
    RmqModule.register('AUTH'),
    DatabaseModule,
    ListModule,
    ItemModule,
  ],
})
export class AppModule {}
