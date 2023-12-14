import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DatabaseService } from '../database/database.service';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDto } from 'libs/common';
import { Observable } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly dbService: DatabaseService, @Inject('NOTIFY') private notifyClient: ClientProxy){}
  DATE_OFFSET = 2 * 3600 * 1000

  @Cron('* */2 * * *')
  async notifyDeadlines() {
    const dateFrom = new Date()
    const dateTo = new Date(Date.now() + this.DATE_OFFSET );

    const deadlines = await this.dbService.item.findMany({
      where: { 
        deadline: { gte: dateFrom, lte: dateTo }, 
        done: false, 
        NOT: { notifyCases: { some: { case: { id: 1 } }}}
      },
      select: { userId: true, title: true, id: true },
    })


    deadlines.forEach(item => { this.notify(item) })
  }

  notify(item: {userId: string, title: string, id: string}): Observable<any> {

    return this.notifyClient.emit('notify', {
      receivers: [item.userId],
      header: 'Deadline',
      message: `Deadline of ${item.title} is coming to end`,
      additionalData: null
    })
  }
}

// let combinedItems: Map<string, string[]> = new Map()
// deadlines.forEach(item => {
//   if (combinedItems.has(item.userId)) {
//     combinedItems.get(item.userId).push(item.title)
//   } else {
//     combinedItems.set(item.userId, [item.title])
//   }
// })

// combinedItems.forEach((items, receiver) => {
//   const receivers = [receiver]
//   if (items.length > 1) {
//     this.notifyWrapper({
//       receivers,
//       header: 'Deadline',
//       message: `Deadline of several items is coming to end`,
//       additionalData: items
//     })
//   } else {
//     this.notifyWrapper({
//       receivers,
//       header: 'Deadline',
//       message: `Deadline of ${items[0]} is coming to end`,
//       additionalData: null
//     })
//   }
// })