import { Logger, NotFoundException } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/createList.dto';
import { Item } from './entities/item.entity';
import { UpdateListDto } from './dto/updateList.dto';
@Injectable()
export class AppService {
  protected readonly logger = new Logger(AppService.name)
  constructor(private readonly listsRepository: Repository<List>,private readonly entityManager: EntityManager, @Inject('NOTIFY') private notifyClient: ClientProxy) {}

  createList(dto: CreateListDto): Promise<List> {
    const items = dto.items.map(item => new Item(item))

    const list = new List({ ...dto.list, items })

    return this.entityManager.save(list);
  }

//   sendNotification(): Observable<any> {
//     return this.notifyClient.emit('notify', { message: 'New Notification' });
//   }

  getAll(options: FindManyOptions<List>) {
    return this.listsRepository.findAndCount({ ...options, relations: { items: true }}).then(listsAndCount => ({lists: listsAndCount[0], count: listsAndCount[1]}))
  }

  async getOne(options: FindOneOptions<List>) {
    const list = await this.listsRepository.findOne({ ...options, relations: { items: true }})

    if (!list) throw new NotFoundException()

    return list
  }

  async update(id: string, userId: string, dto: UpdateListDto) {

    const list = await this.getOne({ where: { id, userId } });
    const items = dto.items.map(
      (item) => new Item(item),
    );
    list.items = items;
    await this.listsRepository.update({ id }, { ...dto.list, items })
  }

  remove(id: string, userId: string) {
    return this.listsRepository.delete({ id, userId })
  }
}