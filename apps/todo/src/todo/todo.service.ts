import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client'

@Injectable()
export class TodoService {
  constructor(private readonly dbService: DatabaseService){}

  async create(createItem: Prisma.ItemCreateInput) {
    return this.dbService.item.create({ data: createItem })
  }

  async getAll(options: Prisma.ItemFindManyArgs) {
    const [items, count] = await this.dbService.$transaction([
      this.dbService.item.findMany(options),
      this.dbService.item.count({ where: options.where })
    ]);

    return { data: items, count }
  }

  async findOne(options: Prisma.ItemFindUniqueArgs) {
    const item = await this.dbService.item.findUnique(options)
    if (!item) throw new NotFoundException()
    return item
  }

  async markItemDone(id: string, userId: string) {
    const item = await this.findOne({ where: { id, userId } })

    return this.dbService.item.update({ where: { id }, data: { done: !item.done } })
  }

  update(id: string, updateItemDto: Prisma.ItemUpdateInput) {
    return this.dbService.item.update({ where: {id}, data: updateItemDto })
  }

  remove(id: string, userId: string) {
    return this.dbService.item.delete({where: { id,  userId }})
  }
}
