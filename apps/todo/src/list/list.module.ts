import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}