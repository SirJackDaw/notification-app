import { Module } from '@nestjs/common';
import { DatabaseModule, RmqModule } from 'libs/common';
import { ConfigModule } from '@nestjs/config';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env',
    }),
    RmqModule.register('NOTIFY'),
    RmqModule.register('AUTH'),
    DatabaseModule,
    TypeOrmModule.forFeature([List, Item])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
