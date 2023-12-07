import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard, CurrentUser, JwtPayload } from 'libs/common';
import { GetAllQuery } from './dto/getAllQuery.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@Controller('v1/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('items')
  @ApiQuery({ type: Number, name: 'page', required: false })
  @ApiQuery({ type: Number, name: 'perPage', required: false })
  @ApiQuery({ type: Boolean, name: 'is_done', required: false })
  @ApiOkResponse({ status: 200/* , type: {lists: List[], count: Number } */})
  getLists(@Query() query: GetAllQuery, @CurrentUser() user: JwtPayload) {
    const { page, perPage, isDone } = query
    const take = +perPage || 10;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    return this.todoService.getAll({ where: { userId: user.id, done: isDone }, take, skip })
  }

  @Get('item/done/:id')
  mark(@Param('id') itemId: string, @CurrentUser() user: JwtPayload) {
    return this.todoService.markItemDone(itemId, user.id)
  }

  @Post('item')
  // @ApiBody({ type:  })
  createList(@Body() dto, @CurrentUser() user: JwtPayload) {
    dto.userId = user.id
    return this.todoService.create(dto)
  }

  // @Put('list/:id')
  // updateList(@Param('id') id: string, @Body() dto: UpdateListDto, @CurrentUser() user: JwtPayload) {
  //   return this.todoService.update(id, user.id, dto)
  // }

  @Delete('item/:id')
  deleteItem(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.todoService.remove(id, user.id)
  }
}
