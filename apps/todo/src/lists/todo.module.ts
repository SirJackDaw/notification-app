import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { List } from "./entities/list.entity";
import { Item } from "./entities/item.entity";
import { RmqModule } from "libs/common";

@Module({
    imports: [
      TypeOrmModule.forFeature([List, Item]),
      // RmqModule.register('NOTIFY'),
      // RmqModule.register('AUTH'),
    ],
    controllers: [TodoController],
    providers: [TodoService]
  })
  export class TodoModule {}