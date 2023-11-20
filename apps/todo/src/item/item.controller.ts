import { Controller, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { AuthGuard, CurrentUser } from 'libs/common';

@Controller('todo')
export class ItemController {
  constructor(private readonly todoService: ItemService) {}

  @UseGuards(AuthGuard)
  @Get('items/:listId')
  getTodos(@CurrentUser() user) {
    return this.todoService.getTodosByListId()
  }

  @UseGuards(AuthGuard)
  @Post()
  createTodo(@CurrentUser() user) {
    return 
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  markTodo() {
    return 
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteToDo() {

  }
}
