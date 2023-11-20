import { Logger, NotFoundException } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { List } from './list.entity';
import { CreateListDto } from './dto/createList.dto';
import { UpdateListDto } from './dto/updateList.dto';
@Injectable()
export class ListService {
  protected readonly logger = new Logger(ListService.name)
  constructor(@InjectRepository(List) private readonly listsRepository: Repository<List>, private readonly entityManager: EntityManager, @Inject('NOTIFY') private notifyClient: ClientProxy) {}

  sendNotification(): Observable<any> {
    return this.notifyClient.emit('notify', { message: 'New Notification' });
  }

  getAll(options: FindManyOptions<List>) {
    return this.listsRepository.findAndCount(options).then(result => ({
      lists: result[0],
      count: result[1],
    }))
  }

  create(dto: CreateListDto): Promise<List> {
    const list = new List(dto)

    return this.entityManager.save(list)
  }

  async getOne(options: FindOneOptions<List>) {
    const list = await this.listsRepository.findOne(options)
    if (!list) return new NotFoundException()

    return list
  }

  async update(userId: string, dto: UpdateListDto) {
    const { id } = dto
    this.getOne({ where: { id, userId }})

    return this.listsRepository.update(id, { ...dto })
  }

  delete() {

  }
}
