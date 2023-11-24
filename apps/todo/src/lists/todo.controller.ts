import { ApiQuery, ApiBody, ApiOkResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Put, UseGuards, Body, Param, Delete, Query } from '@nestjs/common';
import { AuthGuard, CurrentUser, JwtPayload } from 'libs/common';
import { TodoService } from './todo.service';
import { CreateListDto } from './dto/createList.dto';
import { UpdateListDto } from './dto/updateList.dto';
import { GetAllQuery } from './dto/getAllQuery.dto';


@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('lists')
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

  @Get('list/:id')
  getList(@Param('id') listId: string, @CurrentUser() user: JwtPayload) {
    return this.todoService.getOne({ where: { id: listId, userId: user.id }})
  }

  @Post('list')
  @ApiBody({ type: CreateListDto })
  createList(@Body() dto: CreateListDto, @CurrentUser() user: JwtPayload) {
    console.log(user)
    dto.userId = user.id
    console.log(dto)
    return this.todoService.createList(dto)
  }

  @Put('list/:id')
  updateList(@Param('id') id: string, @Body() dto: UpdateListDto, @CurrentUser() user: JwtPayload) {
    return this.todoService.update(id, user.id, dto)
  }

  @Delete('list/:id')
  deleteList(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.todoService.remove(id, user.id)
  }
}
