import { Controller, Get, Post, Put, UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard, CurrentUser, JwtPayload } from 'libs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/createList.dto';
import { UpdateListDto } from './dto/updateList.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @UseGuards(AuthGuard)
  @Get('lists')
  getLists(@CurrentUser() user: JwtPayload) {
    return this.listService.getAll({ where: { userId: user.id }})
  }

  @UseGuards(AuthGuard)
  @Get('list/:id')
  getList(@Param('id') listId: string, @CurrentUser() user: JwtPayload) {
    return this.listService.getOne({where: { id: listId, userId: user.id }})
  }

  @UseGuards(AuthGuard)
  @Post('list')
  createList(@Body() dto: CreateListDto, @CurrentUser() user: JwtPayload) {
    dto.userId = user.id
    return this.listService.create(dto)
  }

  @UseGuards(AuthGuard)
  @Put('list')
  updateList(@Body() dto: UpdateListDto, @CurrentUser() user: JwtPayload) {
    return this.listService.update(user.id, dto)
  }
}
