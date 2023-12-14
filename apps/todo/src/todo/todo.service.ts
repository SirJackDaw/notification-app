import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client'

@Injectable()
export class TodoService {
  constructor(private readonly dbService: DatabaseService){}

  async create(createItem: Prisma.ItemCreateInput) {
    return this.dbService.item.create({ data: createItem })
  }

  async getAll(options: Prisma.ItemFindManyArgs): Promise<{ data: any, count: number }> {
    return this.dbService.$transaction([
      this.dbService.item.findMany(options),
      this.dbService.item.count({ where: options.where })
    ]).then(result => ({data: result[0], count: result[1]}));
  }

  async findOneById(id: string, userId: string) {
    const item = await this.dbService.item.findUnique({ where: { id, userId } })
    if (!item) throw new NotFoundException()
    return item
  }

  async markItemDone(id: string, userId: string) {
    const item = await this.findOneById(id, userId)

    return this.dbService.item.update({ where: { id }, data: { done: !item.done } })
  }

  async update(id: string, userId: string, updateItemDto: Prisma.ItemUpdateInput) {
    await this.findOneById(id, userId)
    return this.dbService.item.update({ where: { id, userId }, data: updateItemDto })
  }

  remove(id: string, userId: string) {
    return this.dbService.item.delete({ where: { id,  userId }})
  }
}
