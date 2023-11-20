import { Logger } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  protected readonly logger = new Logger(ItemService.name)
  constructor(@InjectRepository(Item) private readonly ItemsRepository: Repository<Item>, @Inject('NOTIFY') private notifyClient: ClientProxy) {}

  getTodosByListId() {
    
  }
}
